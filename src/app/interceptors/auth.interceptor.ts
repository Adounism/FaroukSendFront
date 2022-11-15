import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, delay, dematerialize, materialize, mergeMap, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   accessToken :any;

  constructor(private authService: AuthService, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

       if (token != null) {
        request = request.clone({ 
          setHeaders:{
            'Content-Type': 'application/ld+json',
            'Authorization': `Bearer ${token}`,

          }

        });
    }    
    return next.handle(request).pipe(catchError((err: HttpErrorResponse)=>{
      // console.log(err);
      // if(err.status === 401){
      //   this.route.navigate(['/login']);
      // }

      return throwError(()=>err)
    }
    ));

  }

  
}


