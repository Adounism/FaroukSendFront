import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Users } from 'src/app/models/Users';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  profileForm!: FormGroup;

  submitted = false;
  selected!: number;
  message:any;


  constructor(private fb: FormBuilder,
     private clientService: ClientService,
      private toast: NgToastService,
      private router: Router) {}

  ngOnInit(): void {
    
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.nullValidator]],

      phone: ['', [Validators.required, Validators.minLength(4)]],

      email: ['', [Validators.nullValidator]],
      occupation: ['', [Validators.nullValidator]],
      pdvNumber: ['', [Validators.nullValidator]],

      // typeClient:['', [Validators.required]]
    });

  }

  get registerFormControl() {
    return this.profileForm.controls;
  }

  ajouter() {

    this.submitted = true;
    if(this.profileForm.valid){


      this.clientService.create(this.profileForm.value).subscribe(res=>{

        
        this.toast.success({
          detail:"Customer add",
          summary:"Customer add success",
          duration: 3000
         });

         this.router.navigate(['/base/listcustomers']);
          
      }, error=>{ 
        console.log(error.error['hydra:description']);
        this.message = error.error['hydra:description'];
        //console.log(error['hydra:description']);
          this.toast.warning({
          detail:"Customer error",
          summary:this.message,
          duration: 3000
         });
         
      });
    }
  }

  // createCustomer(customer: Users){
  //   this.clientService.create(customer).subscribe(async user=>{
      
  //   },
  //   async error =>{
  //     console.log(error.message);
      
  //   });
  // }
}
