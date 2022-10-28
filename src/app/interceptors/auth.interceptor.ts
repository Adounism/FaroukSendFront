import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   accessToken :any;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loggedInUser = this.authService.getLoggedUser;
    this.accessToken = localStorage.getItem('loggedInUser')
    let token = JSON.parse(this.accessToken);
    console.log(token);
    
    // if (token) {
    //     request = request.clone({
    //         setHeaders: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    // }
    return next.handle(request).pipe(catchError((err: HttpErrorResponse)=>{
      return throwError(()=>err)
    }
    ))
  }
}
