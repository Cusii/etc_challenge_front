import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  taskForm: FormGroup;
  isEditing: boolean;
  imageSrc : "/imagen" | undefined;
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditing = !!data.task; // Determina si estamos en modo edición o creación

    this.taskForm = this.fb.group({
      taskName: [this.isEditing ? data.task.taskName : '', Validators.required],
      description: [this.isEditing ? data.task.description : '', Validators.required],
      status: [this.isEditing ? data.task.status : 'pending', Validators.required],
      image: [this.isEditing ? data.task.image : '']
    });
  }


  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      if (this.isEditing) {
        this.taskService.updateTask(this.data.tasktaskId, taskData).subscribe(
          () => {
            this.dialogRef.close(taskData);
          },
          error => {
            console.error('Error updating task:', error);
          }
        );
      } else {
        this.taskService.createTask(taskData).subscribe(
          () => {
            this.dialogRef.close(taskData);
          },
          error => {
            console.error('Error creating task:', error);
          }
        );
      }

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
