import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private BaseUrl = 'http://127.0.0.1:8000/api';
  
  operationEndPoint= {
   listeoperations: this.BaseUrl + '/operations',
   create: this.BaseUrl +'/operations', 
   findById: this.BaseUrl + '/operations/',

 }


  constructor(private httpService: HttpService, private http: HttpClient) { }


  
  getAllOperations(): Observable<any>{
    return this.http.get<any[]>(this.operationEndPoint.listeoperations);
  }

  createOperation(data:any): Promise<any>{
    return this.httpService.post(this.operationEndPoint.create, data);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(this.operationEndPoint.findById + id, {observe: 'response'});
  }


  update(id:number, operartion: any): Observable<any>{ 
    return this.http.put(`${this.operationEndPoint.findById} ${id}`, operartion).pipe(map((res:any)=>{
      return res;
    }));
  }

  find(id:number): Observable<any>{
    return this.http.get<any>(this.operationEndPoint.findById+ id);
  }
}
