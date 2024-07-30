import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName!: string ;
  password!: string ;

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  onLogin(): void {
    this.userService.login({ userName: this.userName, password: this.password })
      .subscribe(response => {
        this.router.navigate(['/tasks']);
      }, error => {
        console.error('Login failed', error);
      });
  }

  goToRegister(): void {
    this.router.navigate(['/user/register']);
  }

}
