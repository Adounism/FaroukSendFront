import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-tables',
  templateUrl: './editsupplier.component.html',
  styleUrls: ['./editsupplier.component.scss']
})
export class EditSupplierComponent implements OnInit{
  profileForm!: FormGroup;

  submitted = false;
  selected!:number;
  supplierId!:number;

  default!:boolean;
  second!:boolean;
  chekisValid!:boolean;
  currentSupplier:any;
  isChecked!:boolean;

  firstName="";
  lastName="";
  name="";

  indiviField:any;
  businField:any;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
     private toast: NgToastService, private service: SupplierService) { }


  ngOnInit(): void {

    this.supplierId = this.route.snapshot.params['id'];
    this.getCurrentSupplier(this.supplierId);

    this.profileForm = this.fb.group({
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
      firstPhone: ['', [Validators.required, Validators.minLength(4)]],
      secondPhone: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator]],
      businessName: ['', [Validators.nullValidator]],
      business:['', [Validators.required]],
      induvidual:['', [Validators.required]]
  });
  }


  verifieCheck(){

    this.profileForm.get('induvidual')?.valueChanges.subscribe(async data=>{
      this.default = true;
      this.second = false;
      this.indiviField = data;
      this.businField = "";
      console.log(data);
      
    });

    this.profileForm.get('business')?.valueChanges.subscribe(data=>{
      this.default = false;
      this.second = true;
      this.businField = data;
      this.indiviField = "";
      console.log(data);
      
    });
  }


  getCurrentSupplier(id:number){
    this.service.find(id).subscribe(data=>{
      this.currentSupplier = data;
      if(this.currentSupplier.individual != null){
        this.firstName = this.currentSupplier?.individual.firstName;
        this.lastName =  this.currentSupplier?.individual.lastName;
        
      }else{
        this.name =  this.currentSupplier?.businessCollection[0].name;
      }
      console.log(data);
      
    })
  }

  ajouter(){

    this.submitted = true;
    this.currentSupplier = this.profileForm.value;
    
    if(this.default == undefined || this.second == undefined){
      console.log("checked value no checked");
      this.toast.warning({
        detail:"Field Error",
        summary:"Le typde de Fournisseur est réquis",
        duration: 3000
        });
      
    }
    
    if(this.currentSupplier.induvidual != ""){
      if(this.indiviField){

        if(!this.currentSupplier.firstName || !this.currentSupplier.lastName){

        this.toast.warning({
          detail:"Field Error",
          summary:"Nom et prenom sont requis",
          duration: 3000
          });
        }else{
          let fname = this.currentSupplier.firstName;
          let lname = this.currentSupplier.lastName;
          this.currentSupplier.businessCollection =[];
          let provider = {
            "firstPhone" : this.currentSupplier.firstPhone,
            "secondPhone": this.currentSupplier.secondPhone,
            "email": this.currentSupplier.email,
            "individual": {
              "firstName": fname,
              "lastName":lname,
            },

            "businessCollection": []

        }
        this.service.editProvider(this.supplierId, provider).subscribe(response=>{
          console.log(response);
          this.router.navigate(['/base/listsuppliers']);
          
        }, error=>{
          console.log(error);
          
        })
      }

        
        // console.log("Send Data to Back");
        
      }  
    }



    if(this.currentSupplier.business != ""){
      if(this.businField){

        if(!this.currentSupplier.businessName){
  
          this.toast.warning({
            detail:"Field Error",
            summary:"Le nom du Business est requis!!",
            duration: 3000
            });
        }else{
          console.log("send data to Back!!");
          this.currentSupplier.firstName = "";
          this.currentSupplier.lastName = "";
                  
          let provider = {
            "firstPhone" : this.currentSupplier.firstPhone,
            "secondPhone": this.currentSupplier.secondPhone,
            "email": this.currentSupplier.email,
            "businessCollection": [{
              "name": this.currentSupplier.businessName,
          
            },]
          }
          
          this.service.editProvider(this.supplierId ,provider).subscribe
          (response=>{
            this.router.navigate(['/base/listsuppliers']);
            
          })
        }
      }

    }

  }


}
