import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BaseUrl = 'http://127.0.0.1:8000/api';
  
  clientEndPoint= {
   login: this.BaseUrl + '/login',
   addNewClient: this.BaseUrl +'/clients', 

 }

  constructor(private http: HttpClient) { }

  isconnected(){
    return localStorage.getItem('loginData') != null;
  }

  userlogin(data: any): Observable<any>{
    return this.http.post(this.clientEndPoint.login, data);
  }
}
