import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskItemComponent } from '../task-item/task-item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-board',
  standalone: true,
  imports: [MatCardModule, CommonModule, DragDropModule],
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.css']
})
export class TasksBoardComponent implements OnInit {

  tasks: Task[] = []; // Almacena todas las tareas

  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService, private cd: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  // Método para cargar y clasificar las tareas
  loadTasks(): void {
    this.taskService.readTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.pendingTasks = tasks.filter(task => task.status === 'pending');
        this.inProgressTasks = tasks.filter(task => task.status === 'in-progress');
        this.completedTasks = tasks.filter(task => task.status === 'completed');
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  onDrop(event: CdkDragDrop<Task[]>, newStatus: 'pending' | 'in-progress' | 'completed'): void {
    if (event.previousContainer !== event.container) {
      const task = event.item.data as Task;
      task.status = newStatus;
      // Actualizar el estado de la tarea
      this.taskService.updateTask(task.taskId, task).subscribe(
        () => {
          // Eliminar la tarea de la lista anterior
          event.previousContainer.data.splice(event.previousIndex, 1);
          // Añadir la tarea a la nueva lista
          event.container.data.push(task);
        },
        error => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      console.log('Same container. No action taken.');
    }

    // Limpieza del estado
    this.cd.detectChanges(); // Forzar detección de cambios
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskItemComponent, {
      width: '400px',
      data: { task }  // Pasamos la tarea al componente del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TaskItemComponent, {
      data: { task: null }, // No pasa datos para la creación de una nueva tarea
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.taskId).subscribe(
      () => {
        // Elimina la tarea de la lista
        this.removeTaskFromList(task);
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }

  private removeTaskFromList(task: Task): void {
    this.pendingTasks = this.pendingTasks.filter(t => t.taskId !== task.taskId);
    this.inProgressTasks = this.inProgressTasks.filter(t => t.taskId !== task.taskId);
    this.completedTasks = this.completedTasks.filter(t => t.taskId !== task.taskId);
  }
}
