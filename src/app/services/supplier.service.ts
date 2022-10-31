import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/Users';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private BaseUrl = environment.BaseUrl;
  
  providerEndPoint= {
   supliersList: this.BaseUrl + '/providers',
   creatProvider: this.BaseUrl +'/providers', 
   findById: this.BaseUrl + '/providers/',

 }

  constructor(private http: HttpClient, private customHttp: HttpService) { }

  
  getAllProviders(): Observable<any>{
    return this.http.get<any[]>(this.providerEndPoint.supliersList);
  }

  create(user: any): Promise<any>{
    return this.customHttp.post(this.providerEndPoint.creatProvider, user);
  }

  find(id:number): Observable<any>{
    return this.http.get<any>(this.providerEndPoint.findById+ id);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(this.providerEndPoint.findById+ id, {observe: 'response'});
  }

  editProvider(id:number, user: any): Observable<any>{ 
    return this.http.put(this.providerEndPoint.findById+ id, user);
  }
}
