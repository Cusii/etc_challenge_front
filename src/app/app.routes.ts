import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component'; 
import { LoginComponent } from './components/login/login.component'; 
import { TasksBoardComponent } from './components/tasks-board/tasks-board.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

export const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'tasks', component: TasksBoardComponent },
  { path: 'tasks/task/:id', component: TaskItemComponent },
  
  { path: '**', redirectTo: '/user/login' }
];
