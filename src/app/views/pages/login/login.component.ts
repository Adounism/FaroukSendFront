import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService } from '../../../services/auth.service';
import {AuthInterceptor} from '../../../interceptors/auth.interceptor';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  cForm!: FormGroup;

  submitted = false;

  constructor(private service: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(){
   let  data = {
      "username":this.cForm.value.username,
      "password":this.cForm.value.password,
    }

    this.service.userlogin(data).subscribe((res: HttpResponse<any>)=>{
      console.log('response from server:', res)
      console.log('response headers', res.headers.keys())
      
    }, async error=> {
      console.log(error.error);
      
    });
   }
}
