import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../models/Users';
import { HttpService } from '../service/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService  {
  private BaseUrl = environment.BaseUrl;
  
   clientEndPoint= {
    listClients: this.BaseUrl + '/clients',
    addNewClient: this.BaseUrl +'/clients', 
    findById: this.BaseUrl + '/clients/',

  }

  constructor(private http: HttpClient,private httpService: HttpService) { 

  }

  getAllClient(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
         
      withCredentials: true, 
      observe: 'response' as 'response'
    };
    return this.http.get<any[]>(this.clientEndPoint.listClients,httpOptions);
  }

  create(user: any): Promise<any>{
    return this.httpService.post(this.clientEndPoint.addNewClient, user)
  }

  // create(user: any): Observable<any>{
  //   return this.http.post(this.clientEndPoint.addNewClient, user,  {observe: 'response'})
  //   .pipe(map((res:any)=>{
  //     console.log(res);
  //     return res;
      
  //   }));
  // }

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
