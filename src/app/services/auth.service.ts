import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public saveTokens(jwtToken: string, csrfToken: string): void {
    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('csrfToken', csrfToken);
  }

  public getJwtToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public getCsrfToken(): string | null {
    return localStorage.getItem('csrfToken');
  }

  public clearTokens(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('csrfToken');
  }
}
