import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, delay, dematerialize, materialize, mergeMap, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   accessToken :any;

  constructor(private authService: AuthService, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body } = request;

    
    console.log("outgoing request",request);
    request = request.clone({ withCredentials: true });
    
    console.log("new outgoing request",request);
    
    return next.handle(request).pipe(catchError((err: HttpErrorResponse)=>{
      console.log(err);
      if(err.status === 401){
        this.route.navigate(['/login']);
      }

      return throwError(()=>err)
    }
    ))


  function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
      
  }

  function error(message: any) {
      return throwError({ error: { message } });
  }

  function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
  }

  }

  
}
