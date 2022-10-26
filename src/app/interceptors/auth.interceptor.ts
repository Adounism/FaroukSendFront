import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken ='';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const req = request.clone({
    //   setHeaders:{
    //     Authorization: `Bearer ${AuthInterceptor.accessToken}`
    //   }
    // })
    return next.handle(request).pipe(catchError((err: HttpErrorResponse)=>{
      return throwError(()=>err)
    }
    ))
  }
}
