import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component'; 
import { LoginComponent } from './components/login/login.component'; 
import { TasksBoardComponent } from './components/tasks-board/tasks-board.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'tasks', component: TasksBoardComponent, canActivate: [AuthGuard]},
  
  { path: '**', redirectTo: '/user/login' }
];
