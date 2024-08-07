import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,  // Asegúrate de importar MatIconModule aquí
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;  // Variable para controlar la visibilidad de la contraseña


  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const newUser = this.loginForm.value;
      this.userService.login({ userName: newUser.userName, password: newUser.password })
        .subscribe(response => {
          this.router.navigate(['/tasks']);
        }, error => {
          console.error('Login failed', error);
          alert("El usuario o la contraseña son incorrectos")
        });
    } else {
      this.loginForm.markAllAsTouched(); // Muestra todos los errores
    }

  }

  goToRegister(): void {
    this.router.navigate(['/user/register']);
  }

}
