import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica si hay un token en localStorage
    const token = localStorage.getItem('csrfToken');
    if (token) {
      // Si el token existe, permite el acceso
      return true;
    } else {
      // Si no hay token, redirige al login
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
