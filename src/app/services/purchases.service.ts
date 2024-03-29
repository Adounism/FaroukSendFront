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

 relationCarteToCartTypePurchase = {
  listAchat: this.BaseUrl + '/relation_card_to_type_cards',
  makeAchat: this.BaseUrl +'/relation_card_to_type_cards',
  findById: this.BaseUrl + '/relation_card_to_type_cards/',
 }

  constructor(private http: HttpClient, private httpService: HttpService) { }

  getAllPurchase(typePurchase:string): Observable<any>{
    return this.http.get<any[]>(this.purchaseEnpoint.listAchat+`?typePurchase=${typePurchase}`);
  }

  getAllPurchaseByProviderType(type:string): Observable<any>{
    return this.http.get<any[]>(this.purchaseEnpoint.listAchat+`?exists[provider.${type}]=${true}`);
  }

  getProviderPurchase(id:number){
    return this.http.get<any[]>(this.purchaseEnpoint.listAchat+ `?provider=${id}`);
  }
  findByRangeDateTransfertPurchase(from: any, to: any ): Observable<any>{

    return this.http.get<any>(this.purchaseEnpoint.listAchat+ `?date[after]=${from}&date[before]=${to}`);
  }

  getSearchPurchase( search:string): Observable<any>{

    return this.http.get<any[]>(this.purchaseEnpoint.listAchat+ `?provider.firstName=${search}`);
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
  getAllCardPurchase(page:number): Observable<any>{
    return this.http.get<any[]>(this.carteCreditPurchase.listAchat + `?page=${page}`);
  }

  createCardPurchase(data: any): Promise<any>{
    return this.httpService.post(this.carteCreditPurchase.makeAchat, data);
  }
  findByRangeDateCreditCardPurchase(from: any, to: any ): Observable<any>{

    return this.http.get<any>(this.carteCreditPurchase.listAchat+ `?date[after]=${from}&date[before]=${to}`);
  }

  getSearchCreditCardPurchase( search:string): Observable<any>{

    return this.http.get<any[]>(this.purchaseEnpoint.listAchat+ `?provider.firstName=${search}`);
  }
  getSearchCardPurchaseByCardType(search:string): Observable<any>{

    return this.http.get<any[]>(this.carteCreditPurchase.listAchat+ `?cardToTypeCardRelation.typeCardForSale.name=${search}`);
  }


  findCardPurchase(id:number): Observable<any>{
    return this.http.get<any>(this.carteCreditPurchase.findById+ id);
  }

  deleteCardPurchase(id:number): Observable<any>{
    return this.http.delete(this.relationCarteToCartTypePurchase.findById+ id, {observe: 'response'});
  }

  editCardPurchase(id:number, data: any): Observable<any>{
    return this.http.put(this.carteCreditPurchase.findById+ id, data);
  }
}
