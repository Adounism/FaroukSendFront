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

 cardForSale= {
  cardListe: this.BaseUrl + '/card_for_sales',
  create: this.BaseUrl +'/card_for_sales', 
  findById: this.BaseUrl + '/card_for_sales/',
}
collection = {
  collectionListe: this.BaseUrl + '/collections',
  create: this.BaseUrl +'/collections', 
  findById: this.BaseUrl + '/collections/',
}

collectionType = {
  collection_types: this.BaseUrl + '/collection_types',
}

send = {
  sendListe: this.BaseUrl + '/sends',
  create: this.BaseUrl +'/sends', 
  findById: this.BaseUrl + '/sends/',
}

sendType = {
  send_types: this.BaseUrl + '/send_types',
}


  constructor(private httpService: HttpService, private http: HttpClient) { 


  }

  createTransaction(data:any): Promise<any>{
    return this.httpService.post(this.transactionEndPoint.create, data);
  }

  getAllTransaction(page: number):Observable<any>{
    return this.http.get<any[]>(this.transactionEndPoint.transactionListe+ '?page=' +page);
  }


  find(id:number): Observable<any>{
    return this.http.get<any>(this.transactionEndPoint.findById+ id);
  }
  findByRangeDate(from: any, to: any ): Observable<any>{
    
    return this.http.get<any>(this.transactionEndPoint.findById+ `?operation=1&createdAt[after]=${from}&createdAt[before]=${to}`);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(this.transactionEndPoint.findById + id, {observe: 'response'});
  }

  editTransaction(id:number, data:any): Observable<any>{ 
    return this.http.put(`${this.transactionEndPoint.findById} ${id}`, data, {observe: 'response'});
  }


  //Encaissement et Decaissment 
  createtresorieOpe(data:any): Promise<any>{
    return this.httpService.post(this.collection.create, data, {observe: 'response'});
  }

  findencaissement(id:number): Observable<any>{
    return this.http.get<any>(this.send.findById+ id);
  }
  getAllTresorie():Observable<any>{
    return this.http.get<any[]>(this.collection.collectionListe+"?collectionType=collection");
  }

  getAllTresoriedecaissement():Observable<any>{
    return this.http.get<any[]>(this.collection.collectionListe+"?collectionType=collection");
  }
  
  deleteTresorieOpe(id:number):Observable<any>{
    return this.http.delete(this.collection.findById + id, {observe: 'response'});
  }


  editTresorieOpe(id:number, data:any): Observable<any>{ 
    return this.http.put(`${this.collection.findById} ${id}`, data, {observe: 'response'});
  }

//Transfert Mobile et Retour d'envoi
maketeMobileSend(data:any){
  return this.httpService.post(this.send.create, data, {observe: 'response'});
}

getAllMobileSend(){
  return this.http.get<any[]>(this.send.sendListe);
}

deletemobileTransfert(id:number){
  return this.http.delete(this.send.findById + id, {observe: 'response'});
}

editmobileTransfert(id:number, data:any): Observable<any>{ 
  return this.http.put(`${this.send.findById} ${id}`, data, {observe: 'response'});
  
}
findmobileTransfert(id:number): Observable<any>{
  return this.http.get<any>(this.send.findById+ id);
}

}