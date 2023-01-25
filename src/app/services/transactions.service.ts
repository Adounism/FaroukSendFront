import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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

relationCardToTypeCards= {
  cardListe: this.BaseUrl + '/relation_card_to_type_cards',
  create: this.BaseUrl +'/relation_card_to_type_cards',
  findById: this.BaseUrl + '/relation_card_to_type_cards/',
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

reports = {
  importTransaction: this.BaseUrl + '/reports',
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

  //ENDPOINT METHODE TO GET CREDENTIAL FOR CLIENT
   getClientTransaction(id:number){
    return this.http.get<any[]>(this.transactionEndPoint.transactionListe+ '?client.id=' +id);

  }



  getSearchCreditSeal( search:string): Observable<any>{

    return this.http.get<any[]>(this.transactionEndPoint.transactionListe+ `?client.firstName=${search}&client.lastName=${search}`);
  }



  find(id:number): Observable<any>{
    return this.http.get<any>(this.transactionEndPoint.findById+ id);
  }
  findByRangeDate(from: any, to: any ): Observable<any>{

    return this.http.get<any>(this.transactionEndPoint.findById+ `?date[after]=${from}&date[before]=${to}`);
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
    return this.http.get<any>(this.collection.findById+ id);
  }

  getAllTresorie(type:string):Observable<any>{
    return this.http.get<any[]>(this.collection.collectionListe+ `?collectionType=${type}`);
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

  findByRangeDateTransfert(from: any, to: any ): Observable<any>{

    return this.http.get<any>(this.send.sendListe+ `?date[after]=${from}&date[before]=${to}`);
  }

  getAllMobileSends(page:number): Observable<any>{

    return this.http.get<any[]>(this.send.sendListe +'?page=' +page);
  }

  getAllMobileSend(sendtype:string): Observable<any>{

    return this.http.get<any[]>(this.send.sendListe+ `?sendType[]=${sendtype}`);
  }

  getSearchMobileSend( search:string): Observable<any>{

    return this.http.get<any[]>(this.send.sendListe+ `?client.firstName=${search}`);
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

  getAllSenType():Observable<any>{
    return this.http.get<any>(this.sendType.send_types);
  }

  // CARD SALES
  saleCard(data:any): Promise<any>{
    return this.httpService.post(this.cardForSale.create, data, {observe: 'response'});
  }

  findByRangeDateMobileTransfert(from: any, to: any ): Observable<any>{

    return this.http.get<any>(this.cardForSale.cardListe+ `?date[after]=${from}&date[before]=${to}`);
  }

  getSearchCardSalling(search:string): Observable<any>{

    return this.http.get<any[]>(this.cardForSale.cardListe+ `?client.firstName=${search}`);
  }

  getSearchCardByCardType(search:string): Observable<any>{

    return this.http.get<any[]>(this.cardForSale.cardListe+ `?cardToTypeCardRelation.typeCardForSale.name=${search}`);
  }

  getSearchCardPurchaseByCardType(search:string): Observable<any>{

    return this.http.get<any[]>(this.cardForSale.cardListe+ `?cardToTypeCardRelation.typeCardForSale=${search}`);
  }


  getAllCardSales(page:number){
    return this.http.get<any[]>(this.cardForSale.cardListe + '?page=' +page);
  }

  editCardSelling(id: number, data:any): Observable<any>{
    return this.http.put(`${this.relationCardToTypeCards.findById} ${id}`, data, {observe: 'response'});

  }

  findSellingCard(id:number): Observable<any>{
    return this.http.get<any>(this.relationCardToTypeCards.findById+ id);
  }

  deleteCardSelle(id:number){
    return this.http.delete(this.relationCardToTypeCards.findById + id, {observe: 'response'});
  }

  //UPLOAD FILE
  upload(file: File): Promise<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    return this.httpService.post(this.reports.importTransaction, file, {observe: 'response'});
    // const req = new HttpRequest('POST', `${this.reports.importTransaction}`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });

    // return this.http.request(req);
  }
}
