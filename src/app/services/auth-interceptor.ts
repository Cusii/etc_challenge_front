import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.getJwtToken();
    const csrfToken = this.authService.getCsrfToken();

    if (jwtToken) {
      req = req.clone({
        setHeaders: {
          //Authorization: `Bearer ${jwtToken}`,
          'X-CSRF-TOKEN': csrfToken || ''
        }
      });
    }

    return next.handle(req);
  }
}
