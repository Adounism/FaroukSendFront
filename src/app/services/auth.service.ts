import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getLoggedUser:any;
  coockieValue:any;

  clientEndPoint= {
   login: environment.BaseUrl+ '/login',

 }

  TOKEN_KEY = 'token';
  USER_KEY = 'auth-user';

  constructor(private http: HttpClient, private cookieService: CookieService, private route: Router) { 
  this.coockieValue = this.cookieService.get('PHPSESSID');

  }

  isconnected(){
    return sessionStorage.getItem(this.TOKEN_KEY) !=null;
  }

  userlogin(data: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
     
    withCredentials: true, 
    observe: 'response' as 'response'
    };  
    return this.http.post<any[]>(environment.BaseUrl+'/login', data,httpOptions).pipe(map((response: any)=> {
      console.log(response);
      
      
      return response;
  }));

  
    
    // return this.http.post<any[]>(this.clientEndPoint.login, data,  {observe: 'response'});
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
}
