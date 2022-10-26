import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class ClientService  {
  private BaseUrl = 'http://127.0.0.1:8000/api';
  
   clientEndPoint= {
    listClients: this.BaseUrl + '/clients',
    addNewClient: this.BaseUrl +'/clients', 
    findById: this.BaseUrl + '/clients/',

  }

  constructor(private http: HttpClient) { 

  }

  getAllClient(): Observable<any>{
    return this.http.get<any[]>(this.clientEndPoint.listClients);
  }

  create(user: any): Observable<any>{
    return this.http.post(this.clientEndPoint.addNewClient, user,  {observe: 'response'})
    .pipe(map((res:any)=>{
      console.log(res);
      return res;
      
    }));
  }

  find(id:number): Observable<any>{
    return this.http.get<any>(this.clientEndPoint.findById+ id);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(this.clientEndPoint.findById + id, {observe: 'response'});
  }

  editClient(id:number, user: Users): Observable<any>{ 
    return this.http.put(`${this.clientEndPoint.findById} ${id}`, user).pipe(map((res:any)=>{
      return res;
    }));
  }

}
