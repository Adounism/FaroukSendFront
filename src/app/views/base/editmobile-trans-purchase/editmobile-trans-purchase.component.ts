import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DatePipe } from '@angular/common';
import { SupplierService } from 'src/app/services/supplier.service';
import { PurchasesService } from 'src/app/services/purchases.service';
@Component({
  selector: 'app-editmobile-trans-purchase',
  templateUrl: './editmobile-trans-purchase.component.html',
  styleUrls: ['./editmobile-trans-purchase.component.scss']
})
export class EditmobileTransPurchaseComponent implements OnInit {
  transactionForm!: FormGroup;
  profileForm!: FormGroup;
  supplierListe: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;
  onLoading = false;


 
  submitted = false;
  selected!: number;
  message:any;
  currentMobileTransId!:number;
  currentMobileTransPurchaseData:any;

  constructor(private supplier: SupplierService,
    private purchaseService: PurchasesService,
     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder,
     private modalService: MdbModalService,
     private route:ActivatedRoute
     ) {
   

   this.currentMobileTransId = this.route.snapshot.params['id'];
   this.getSupplierList();
  }

  ngOnInit(): void {
   
    this.getCurrentMobilePurchase(this.currentMobileTransId);
    // this.transactionForm =  this.fb.group({
    //   provider: ['', [Validators.required]],
    //   montant:['', [Validators.required]],
    //   date:['', [Validators.required]],
      

    // });


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

  getCurrentMobilePurchase(id:number){
    this.purchaseService.find(id).subscribe(data=>{
      this.currentMobileTransPurchaseData = data;
    },error=>{
      if(error.status == 404){
        this.router.navigate(['/404']);
      }
    });
  }

  getSupplierList(){
    this.supplier.getAllProviders().subscribe(data=>{
      this.supplierListe = data;
      console.log(this.supplierListe);
      
    })
  }



  update(form:NgForm){


    if(form){

      this.onLoading = true;

      this.transactionData = form.value;
      console.log(this.transactionData);
      
      let pipe = new DatePipe('en-US'); 
      const myFormattedDate = pipe.transform(this.transactionData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      let transaction= {
        "amount": this.transactionData.montant,
        "provider": '/api/providers/'+this.transactionData.provider["id"] ,
        "date":myFormattedDate,
        "typePurchase":"mobileTransferPurchase"
      }

      console.log(transaction);
      if(this.transactionData.montant != "" && this.transactionData.montant > 0){

        this.purchaseService.editPurchase(this.currentMobileTransId ,transaction).subscribe(resp=>{

          this.toast.success({
            detail:"Modifier avec success",
            summary:"",
            duration: 3000
            });
            this.router.navigate(['/base/printmobiletransfertpurchase']);
            
        },error=>{
          this.onLoading = false;

          this.toast.warning({
            detail:"error",
            summary:error.body.message,
            duration: 3000
            });
        })
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
