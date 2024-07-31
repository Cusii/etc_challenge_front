import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  ageOptions = ['18-24', '25-34', '35-44', '45-54', '55+'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      phone: [''],
      age: [''],
      gender: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/)
        ]
      ]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;

      this.userService.register(newUser).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/tasks']);
        },
        error => {
          console.error('Registration failed', error);
          if (error.status === 409) {
            alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
          } else {
            alert('Error al registrar. Por favor, intenta nuevamente.');
          }
        }
      );
    } else {
      this.registerForm.markAllAsTouched(); // Muestra todos los errores
    }
  }

  gotToLogin(): void {
    this.router.navigate(['/user/login']);
  }
}
