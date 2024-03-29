import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService } from '../../../services/auth.service';
import {AuthInterceptor} from '../../../interceptors/auth.interceptor';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  cForm!: FormGroup;

  submitted = false;
  isLoggedIn!:boolean;
  text_error_message!:string;

  constructor(private service: AuthService, private fb: FormBuilder, private route: Router,
    private toast: NgToastService,) { }

  ngOnInit(): void {

    if (this.service.getToken()) {
      this.isLoggedIn = true;

    }
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
        console.log(res.body.token);

        this.service.saveToken(res.body.token);

        this.route.navigate(['/base/dashboard']);
      }

    },  error=> {
      console.log(error.error);
      this.text_error_message = error.error.message;
      this.toast.warning({
        detail:error.error.message,
        summary:"",
        duration: 3000
       });

    });
   }

   logout(): void {
    this.service.signOut();
    window.location.reload();
  }
}
