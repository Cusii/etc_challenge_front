import { Injectable } from '@angular/core';
import { appsettings } from '../components/settings/app-settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskBasePath: String = appsettings.apiBasePath +"task/"

  constructor(private http: HttpClient) { }

  // Crear una nueva tarea
  createTask(taskData: Task): Observable<Task> {
    return this.http.post<Task>(`${this.taskBasePath}create`, taskData);
  }

  // Leer una tarea por ID
  readTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.taskBasePath}${taskId}`);
  }

  // Leer todas las tareas
  readTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.taskBasePath}all`);
  }

  // Actualizar una tarea por ID
  updateTask(taskId: number, updatedTaskData: Task): Observable<Task> {
    return this.http.put<Task>(`${this.taskBasePath}update/${taskId}`, updatedTaskData);
  }

  // Eliminar una tarea por ID
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.taskBasePath}delete/${taskId}`);
  }
}
