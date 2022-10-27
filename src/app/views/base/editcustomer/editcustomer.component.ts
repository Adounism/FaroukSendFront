import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-progress',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.scss']
})
export class EditCustomerComponent implements OnInit{

  firstName = new FormControl();

  customerForm!: FormGroup;
  currentCustomer:any;

  submitted = false;
  selected!: number;
  customerId!: number;
  constructor(private fb: FormBuilder,
     private clientService: ClientService, private route: ActivatedRoute,
     private toast: NgToastService,private router: Router) {}

  ngOnInit(): void {

    this.customerId = this.route.snapshot.params['id'];
    this.getCustomer(this.customerId);

    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.nullValidator]],

      phone: ['', [Validators.required, Validators.minLength(4)]],

      email: ['', [Validators.nullValidator]],
      occupation: ['', [Validators.nullValidator]],
      pdvNumber: ['', [Validators.nullValidator]],

    });

    
  }

  getCustomer(id:number) {

    this.clientService.find(id).subscribe( data=>{
      this.currentCustomer = data;
      
    }, 
    error=>{
      if(error.status == 404){
        this.router.navigate(['/404']);
      }
      
    }
    )
  }

  updateCustomer():void{
    this.clientService.editClient(this.customerId, this.currentCustomer).subscribe(
      response=>{
        console.log(response);
        
       this.toast.success({
        detail:"Customer update success",
        summary:"",
        duration: 3000
       });
       this.router.navigate(['/base/listcustomers']);
    }, error =>{
      console.log(error);
      
    })
  }

}
