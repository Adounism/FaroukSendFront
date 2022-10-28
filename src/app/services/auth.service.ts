import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BaseUrl = environment.BaseUrl;
  private loggedUserSubject: BehaviorSubject<any>;
  public loggedInUser: Observable<any>;
  getLoggedUser:any;
  jwt:any;
  clientEndPoint= {
   login: this.BaseUrl + '/login',

  

 }

  constructor(private http: HttpClient) { 
    this.jwt = localStorage.getItem('loggedInUser');
    this.getLoggedUser = JSON.parse(this.jwt);
    this.loggedUserSubject = new BehaviorSubject(this.getLoggedUser);
    this.loggedInUser = this.loggedUserSubject.asObservable();
  }

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
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let options = new RequestOptions({ headers: headers, withCredentials: true });

    
    return this.http.post<any[]>(this.clientEndPoint.login, data, httpOptions).pipe(map((response: any)=> {
      // localStorage.setItem('loggedInUser', JSON.stringify(response));
      // this.loggedUserSubject.next(response);
      console.log(response.headers.get('Date'));
      return response;
  }));

  
    
    // return this.http.post<any[]>(this.clientEndPoint.login, data,  {observe: 'response'});
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser');
    this.loggedUserSubject.next(null);
}
public get loggedInUserValue(){
    return this.loggedUserSubject.value;
}
}
