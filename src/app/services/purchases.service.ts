import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private BaseUrl = 'http://127.0.0.1:8000/api';
  
  purchaseEnpoint= {
   listAchat: this.BaseUrl + '/purchases',
   makeAchat: this.BaseUrl +'/purchases', 
   findById: this.BaseUrl + '/purchases/',

 }

  constructor(private http: HttpClient) { }

  getAllPurchase(): Observable<any>{
    return this.http.get<any[]>(this.purchaseEnpoint.listAchat);
  }

  create(user: any): Observable<any>{
    return this.http.post(this.purchaseEnpoint.makeAchat, user, {responseType:"text"});
  }

  find(id:number): Observable<any>{
    return this.http.get<any>(this.purchaseEnpoint.findById+ id);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(this.purchaseEnpoint.findById+ id, {responseType:"text"});
  }

  editPurchase(id:number, user: Users): Observable<any>{ 
    return this.http.put(this.purchaseEnpoint.findById+ id, user);
  }
}
