import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isconnected(){
    return localStorage.getItem('loginData') != null;
  }
}
