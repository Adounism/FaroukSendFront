import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService  {
  private BaseUrl = 'http://127.0.0.1:8000/api';
  
   clientEndPoint= {
    listClients: this.BaseUrl + '/clients',
    addNewClient: this.BaseUrl +'/clients', 

  }

  constructor(private http: HttpClient) { 

  }

  getAllClient(): Observable<any>{
    return this.http.get(this.clientEndPoint.listClients);
  }

  addClient(user: any): Observable<any>{
    return this.http.post(this.clientEndPoint.addNewClient, user);
  }

}
