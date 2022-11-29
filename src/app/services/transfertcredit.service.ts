import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class TransfertcreditService {
  private BaseUrl = environment.BaseUrl;
  
  transfertCreditEndPoint= {
   transfertcreditListe: this.BaseUrl + '/transfert_credits',
   create: this.BaseUrl +'/transfert_credits', 
   findById: this.BaseUrl + '/transfert_credits/',
 }

 addExecelFile= {
  create: this.BaseUrl +'/reports', 
}



  constructor(private httpService: HttpService, private http: HttpClient) { }


  createtransfertcredit(data:any): Promise<any>{
    return this.httpService.post(this.transfertCreditEndPoint.create, data);
  }

  getAlltransfertcredit(page: number):Observable<any>{
    return this.http.get<any[]>(this.transfertCreditEndPoint.transfertcreditListe+ '?page=' +page);
  }

  searchtransfertcredit(searchTerm:string):Observable<any>{
    return this.http.get<any[]>(this.transfertCreditEndPoint.transfertcreditListe + `?clientNumber=${searchTerm}`);
  }

  find(id:number): Observable<any>{
    return this.http.get<any>(this.transfertCreditEndPoint.findById+ id);
  }
  findByRangeDate(from: any, to: any ): Observable<any>{
    
    return this.http.get<any>(this.transfertCreditEndPoint.findById+ `?date[after]=${from}&date[before]=${to}`);
  }

  delete(id:number): Observable<any>{
    return this.http.delete(this.transfertCreditEndPoint.findById + id, {observe: 'response'});
  }

  edittransfertcredit(id:number, data:any): Observable<any>{ 
    return this.http.put(`${this.transfertCreditEndPoint.findById} ${id}`, data, {observe: 'response'});
  }
    //UPLOAD FILE 
    upload(file: FormData): Promise<any> {

      const formData: FormData = new FormData();
  
      // formData.append('file', file);
      // console.log(file);

      return this.httpService.post(this.addExecelFile.create, file, {observe: 'response'});
      // const req = new HttpRequest('POST', `${this.reports.importTransaction}`, formData, {
      //   reportProgress: true,
      //   responseType: 'json'
      // });
  
      // return this.http.request(req);
    }

}
