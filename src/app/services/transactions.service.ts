import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private BaseUrl = environment.BaseUrl;
  
  transactionEndPoint= {
   transactionListe: this.BaseUrl + '/transactions',
   create: this.BaseUrl +'/transactions', 
   findById: this.BaseUrl + '/transactions/',

 }


  constructor(private httpService: HttpService, private http: HttpClient) { 


  }

  createTransaction(data:any): Promise<any>{
    return this.httpService.post(this.transactionEndPoint.create, data);
  }

  getAllTransaction():Observable<any>{
    return this.http.get<any[]>(this.transactionEndPoint.transactionListe);
  }


  find(id:number): Observable<any>{
    return this.http.get<any>(this.transactionEndPoint.findById+ id);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(this.transactionEndPoint.findById + id, {observe: 'response'});
  }

  editTransaction(id:number, data:any): Observable<any>{ 
    return this.http.put(`${this.transactionEndPoint.findById} ${id}`, data, {observe: 'response'});
  }
}
