import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  static isLoading = false;

  headers = [];
  constructor(private http: HttpClient,private toast: NgToastService) { }

  post(url :string,data :any,headers ?:any) :Promise<any> {
    HttpService.isLoading = true;
    return new Promise((resolve:any,reject:any)=>{
      
      this.http.post(url, data)
    .subscribe(res=>{
      resolve(res)        
    }, error=>{ 
      reject(error)
      HttpService.isLoading = false;
      let violations = "";
      if (error.error.violations && error.error.violations.length > 0) {
        error.error.violations.forEach((element:any) => {
          violations+=element["propertyPath"]+": "+element["message"].toString()+"\n"
        });
      }
      //console.log(error['hydra:description']);
        this.toast.warning({
        detail:"Une erreur est survénu !",
        summary:violations.toString(),
        duration: 3000
       });
    })
    });
  }

  private handleError(error: any) {
    debugger
    return throwError(error);
  }
}
