import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService } from '../../../services/auth.service';
import {AuthInterceptor} from '../../../interceptors/auth.interceptor';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  cForm!: FormGroup;

  submitted = false;

  constructor(private service: AuthService, private fb: FormBuilder, private route: Router) { }

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



    this.service.userlogin(data).subscribe((res)=>{
      console.log('response from server:', res);
      if(res.status === 200){
        this.route.navigate(['/base/listcustomers']);
      }

    }, async error=> {
      console.log(error.error);
      
    });
   }
}
