import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  
  profileForm!: FormGroup;

  submitted = false;
  selected!:number;

  // firstName:string;
  // lastName:string;
  // address:string;
  // phone:string;
  // email:string;
  // typeFournisseur:string;
  // business:string;
  default!:boolean;
  second!:boolean;
  chekisValid!:boolean;
  supplierData:any;

  constructor(private fb: FormBuilder, private toast: NgToastService, private service: SupplierService) {
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
      adresse: ['', [Validators.nullValidator]],
      firstPhone: ['', [Validators.required, Validators.minLength(4)]],
      secondPhone: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator]],
      businessName: ['', [Validators.nullValidator]],
      business:['', [Validators.required]],
      induvidual:['', [Validators.required]]
    });


  }


  typeChanged(e:any){
    console.log(e.value);

    // this.profileForm.get('typeFournisseur')!.valueChanges.subscribe(data=>{
    //   console.log(data);
      
    // }
    //   )
    
    if(e.value == 1){

      this.selected = 1;
      
      this.profileForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        adresse: ['', [Validators.nullValidator]],
  
        phone: ['', [Validators.required, Validators.minLength(4)]],
  
        email: ['', [Validators.nullValidator]],
  
        typeFournisseur:['', [Validators.required]],
        business:['', [Validators.nullValidator]]
        
      });
  
    }else if(e.value== 2){
      this.selected = 2;

      this.profileForm = this.fb.group({
        // adresse: ['', [Validators.nullValidator]],
  
        // phone: ['', [Validators.required, Validators.minLength(4)]],
  
        // email: ['', [Validators.nullValidator]],
        business:['', [Validators.nullValidator]],
  
        // typeFournisseur:['', [Validators.required]]
      });

    }
    
  }


  ajouter() {
    this.submitted = true;
    this.supplierData = this.profileForm.value;
    if(this.supplierData.induvidual != ""){
      if(!this.supplierData.firstName || !this.supplierData.lastName){
      this.toast.warning({
        detail:"Field Error",
        summary:"Nom et prenom sont requis",
        duration: 3000
        });
      }else{
        let fname = this.supplierData.firstName;
        let lname = this.supplierData.lastName;
        let provider = {
          "firstPhone" : this.supplierData.firstPhone,
          "secondPhone": this.supplierData.secondPhone,
          "email": this.supplierData.email,
          "individual": {
            "firstName": fname,
            "lastName":lname,
          },

        }

        console.log(provider);

        this.service.create(provider).subscribe(response=>{
          console.log(response);
          
        }, error=>{
          console.log(error);
          
        })
        
        // console.log("Send Data to Back");
        
      }  
    }

    if(this.supplierData.business != ""){
      if(!this.supplierData.businessName){

        this.toast.warning({
          detail:"Field Error",
          summary:"Le nom du Business est requis!!",
          duration: 3000
          });
      }else{
        console.log("send data to Back!!");
                
        let provider = {
          "firstPhone" : this.supplierData.firstPhone,
          "secondPhone": this.supplierData.secondPhone,
          "email": this.supplierData.email,
          "businessCollection": [{
            "name": this.supplierData.businessName,
        
          },]
        }

        this.service.create(provider).subscribe(response=>{
          console.log(response);
          
        })
      }

    }
  }

  verifieCheck(){

    this.profileForm.get('induvidual')?.valueChanges.subscribe(async data=>{
      this.default = true;
      this.second = false;
      console.log(data);
      
    });

    this.profileForm.get('business')?.valueChanges.subscribe(data=>{
      this.default = false;
      this.second = true;
      console.log(data);
      
    });
  }

}
