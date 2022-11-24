import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/Users';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private BaseUrl = environment.BaseUrl;
  
  purchaseEnpoint= {
   listAchat: this.BaseUrl + '/purchases',
   makeAchat: this.BaseUrl +'/purchases', 
   findById: this.BaseUrl + '/purchases/',

 }

 carteCreditPurchase = {
  listAchat: this.BaseUrl + '/card_purchases',
  makeAchat: this.BaseUrl +'/card_purchases', 
  findById: this.BaseUrl + '/card_purchases/',
 }

  constructor(private http: HttpClient, private httpService: HttpService) { }

  getAllPurchase(typePurchase:string): Observable<any>{
    return this.http.get<any[]>(this.purchaseEnpoint.listAchat+`?typePurchase=${typePurchase}`);
  }

  create(data: any): Promise<any>{
    return this.httpService.post(this.purchaseEnpoint.makeAchat, data);
  }

  find(id:number): Observable<any>{
    return this.http.get<any>(this.purchaseEnpoint.findById+ id);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(this.purchaseEnpoint.findById+ id, {observe: 'response'});
  }

  editPurchase(id:number, data: any): Observable<any>{ 
    return this.http.put(this.purchaseEnpoint.findById+ id, data);
  }




  //Carte de credit Achat Fournisseur
  getAllCardPurchase(): Observable<any>{
    return this.http.get<any[]>(this.carteCreditPurchase.listAchat);
  }

  createCardPurchase(data: any): Promise<any>{
    return this.httpService.post(this.carteCreditPurchase.makeAchat, data);
  }

  findCardPurchase(id:number): Observable<any>{
    return this.http.get<any>(this.carteCreditPurchase.findById+ id);
  }

  deleteCardPurchase(id:number): Observable<any>{
    return this.http.delete(this.carteCreditPurchase.findById+ id, {observe: 'response'});
  }

  editCardPurchase(id:number, data: any): Observable<any>{ 
    return this.http.put(this.carteCreditPurchase.findById+ id, data);
  }
}
