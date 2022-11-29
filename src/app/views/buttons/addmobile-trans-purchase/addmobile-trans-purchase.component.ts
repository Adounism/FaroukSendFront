import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DatePipe } from '@angular/common';
import { SupplierService } from 'src/app/services/supplier.service';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-addmobile-trans-purchase',
  templateUrl: './addmobile-trans-purchase.component.html',
  styleUrls: ['./addmobile-trans-purchase.component.scss']
})
export class AddmobileTransPurchaseComponent implements OnInit {
  transactionForm!: FormGroup;
  businessForm!: FormGroup;
  individulForm!: FormGroup;
  profileForm!: FormGroup;
  supplierListe: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;
  onLoading = false;
  supplierData:any;

  default!:boolean;
  second!:boolean;
 
  submitted = false;
  selected!: number;
  message:any;


  constructor(private supplier: SupplierService,
    private purchaseService: PurchasesService,
     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder,
     private modalService: MdbModalService
     ) {
   

   this.getSupplierList();
  }

  ngOnInit(): void {
   
    this.transactionForm =  this.fb.group({
      provider: ['', [Validators.required]],
      montant:['', [Validators.required]],
      date:['', [Validators.required]],
      

    });

    this.profileForm = this.fb.group({

      adresse: ['', [Validators.nullValidator]],
      firstPhone: ['', [Validators.required, Validators.minLength(4)]],
      secondPhone: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator]],
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
       business: ['', [Validators.nullValidator]],
       induvidual: ['',[Validators.nullValidator]],
      businessType:['', [Validators.nullValidator]],
    });

    this.businessForm = this.fb.group({
      business: ['',[Validators.required]]
    });
    
    this.individulForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    })



  }

  getSupplierList(){
    this.supplier.getAllProviders().subscribe(data=>{
      this.supplierListe = data;
      
    })
  }



  ajouter(){


    if(this.transactionForm.valid){
      this.onLoading = true;

      this.transactionData = this.transactionForm.value;
      let pipe = new DatePipe('en-US'); 
      const myFormattedDate = pipe.transform(this.transactionData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      let transaction= {
        "amount": this.transactionData.montant,
        "provider": '/api/providers/'+this.transactionData.provider["id"] ,
        "date":myFormattedDate,
        "typePurchase":"mobileTransferPurchase"
      }

      if(this.transactionData.montant != "" && this.transactionData.montant > 0){

        this.purchaseService.create(transaction).then(resp=>{

          this.toast.success({
            detail:"Achat effectuée avec success",
            summary:"",
            duration: 3000
            });
            this.router.navigate(['/buttons/printmobiletransfertpurchase']);
            
        }).catch(error=>{
          this.onLoading = false;

          this.toast.warning({
            detail:"error",
            summary:error.body.message,
            duration: 3000
            });
        });
      }else{
        this.onLoading = false;

        this.toast.warning({
          detail:"Transaction Montant error",
          summary:"transaction impossible montant invalid",
          duration: 3000
          });
      }
      
    }else{
      this.onLoading = false;
      this.toast.warning({
        detail:"Field invalid !!!",
        summary:"",
        duration: 3000
        });
    }
  }

  openModal(content:any){
    this.modalService.open(content);
  }


  get registerFormControl() {
    return this.profileForm.controls;
  }

  ajouterFounisseur() {
 
    this.submitted = true;
    this.supplierData = this.profileForm.value;
    
    if(this.default == undefined || this.second == undefined){
      console.log("checked value no checked");
      this.toast.warning({
        detail:"Field Error",
        summary:"Le typde de Fournisseur est réquis",
        duration: 3000
        });
      
    }
    
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
          }

        }

        this.supplier.create(provider).then(response=>{
          console.log(response);
          this.profileForm.reset();
          this.businessForm.reset();
          this.individulForm.reset();
          this.toast.success({
            detail:"Fournisseur Ajouter",
            summary:"",
            duration: 3000
            });
          // this.router.navigate(['/widgets/listsuppliers']);
          
        }, error=>{
          console.log(error);
          this.toast.warning({
            detail:error.body.message,
            summary:"",
            duration: 3000
            });
          this.submitted = false;
        })
        
        // console.log("Send Data to Back");
        
      }  
    }

    if(this.supplierData.business != ""){
      if(!this.supplierData.business){

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
          "business" :{
            "name": this.supplierData.business,
        
          }
        }
        console.log(provider);
        

        this.supplier.create(provider).then
        (response=>{
          this.profileForm.reset();
          this.businessForm.reset();
          this.individulForm.reset();
          this.toast.success({
            detail:"Fournisseur Ajouter",
            summary:"",
            duration: 3000
            });
          // this.router.navigate(['/widgets/listsuppliers']);
          
        }).catch(error=>{
          this.submitted = false;
          this.toast.warning({
            detail:error.body.message,
            summary:"",
            duration: 3000
            });
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

  this.profileForm.get('businessType')?.valueChanges.subscribe(data=>{
    this.default = false;
    this.second = true;
    console.log(data);
    
  });
}




}
