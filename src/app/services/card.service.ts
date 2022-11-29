import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private BaseUrl = environment.BaseUrl;
  
  typeCardEndPoint= {
   listcardType: this.BaseUrl + '/type_card_for_sales',
   create_card: this.BaseUrl +'/type_card_for_sales', 
   findById: this.BaseUrl + '/type_card_for_sales/',

 }

  constructor(private http: HttpClient ,private httpService: HttpService) { }

  getAllTypeOfCard(): Observable<any>{
    return this.http.get<any[]>(this.typeCardEndPoint.listcardType);
  }

  createCard(data:any): Promise<any>{
    return this.httpService.post(this.typeCardEndPoint.create_card, data);
  }
  deleteCard(id:number):Observable<any>{
    return this.http.delete<any>(this.typeCardEndPoint.findById+ id, {observe: 'response'});
  }

  findTypecard(id:number): Observable<any>{
    return this.http.get<any>(this.typeCardEndPoint.findById+ id);
  }
  update(id:number, card: any): Observable<any>{ 
    return this.http.put(`${this.typeCardEndPoint.findById} ${id}`, card).pipe(map((res:any)=>{
      return res;
    }));
  }

}
