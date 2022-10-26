import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BaseUrl = 'http://127.0.0.1:8000/api';
  
  clientEndPoint= {
   login: this.BaseUrl + '/login',

  

 }

  constructor(private http: HttpClient) { }

  isconnected(){
    return localStorage.getItem('loginData') != null;
  }

  userlogin(data: any): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
         
      withCredentials: true, 
      observe: 'response' as 'response'
    };
    console.log(data);
    
    return this.http.post(this.clientEndPoint.login, data,  httpOptions);
  }
}
