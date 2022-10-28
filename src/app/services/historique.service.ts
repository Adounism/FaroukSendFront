import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private BaseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) { 

  }

  getClientHistorique(id:number){
  }

}
