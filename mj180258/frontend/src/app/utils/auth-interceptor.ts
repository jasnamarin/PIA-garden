import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Get token from localStorage

    // Check if the token exists. If not, attach a placeholder value (or leave out the header)
    if (token) {
      // Clone the request and add the Authorization header with the token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // Optionally, you can still send a dummy Authorization header for public routes
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer public`, // Attach a default value
        },
      });
    }

    return next.handle(request); // Pass the request to the next handler (backend)
  }
}
