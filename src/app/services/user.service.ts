import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../components/settings/app-settings';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userBasePath: String = appsettings.apiBasePath + "user/"

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(userData: { userName: string, password: string }): Observable<any> {
    return this.http.post(`${this.userBasePath}login`, userData).pipe(
      tap((response: any) => {
        if (response.jwtToken && response.csrfToken) {
          this.authService.saveTokens(response.jwtToken, response.csrfToken);
        }
      })
    );
  }

  register(userData: { userName: string, phone: string, age: string, gender: string, password: string }): Observable<any> {
    return this.http.post(`${this.userBasePath}register`, userData).pipe(
      tap((response: any) => {
        if (response.jwtToken && response.csrfToken) {
          this.authService.saveTokens(response.jwtToken, response.csrfToken);
        }
      })
    );
  }
}
