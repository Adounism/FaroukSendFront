import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DatePipe } from '@angular/common';
import { SupplierService } from 'src/app/services/supplier.service';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-addcredit-purchase',
  templateUrl: './addcredit-purchase.component.html',
  styleUrls: ['./addcredit-purchase.component.scss']
})
export class AddcreditPurchaseComponent implements OnInit {
  transactionForm!: FormGroup;
  profileForm!: FormGroup;
  supplierListe: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;
  onLoading = false;


 
  submitted = false;
  selected!: number;
  message:any;


  constructor(private supplier: SupplierService,
    private purchaseService: PurchasesService,

     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder,
     private modalService: MdbModalService,

     
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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.nullValidator]],

      phone: ['', [Validators.required, Validators.minLength(4)]],

      email: ['', [Validators.nullValidator]],
      occupation: ['', [Validators.nullValidator]],
      pdvNumber: ['', [Validators.nullValidator]],

      //typeClient:['', [Validators.required]]
    });




  }

  getSupplierList(){
    this.supplier.getAllProviders().subscribe(data=>{
      this.supplierListe = data;
      console.log(this.supplierListe);
      
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
        "typePurchase":"purchaseOfCredits"
      }

      console.log(transaction);
      if(this.transactionData.montant != "" && this.transactionData.montant > 0){

        this.purchaseService.create(transaction).then(resp=>{

          this.toast.success({
            detail:"Achat effectuée avec success",
            summary:"",
            duration: 3000
            });
            this.getSupplierList();
            this.router.navigate(['/base/printcreditpurchase']);
            
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

  ajouterclient() {


  
    if(this.profileForm.valid){
      this.submitted = true;
      this.supplier.create(this.profileForm.value).then((res)=>{

        this.toast.success({
          detail:"Client ajouter",
          summary:"Client ajouter avec succes",
          duration: 3000
         });
         
         this.submitted = false;
      }).catch(error=>{
        console.log(error);
        
        this.submitted = false;

      });
    }


  }


}
