import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DatePipe } from '@angular/common';
import { SupplierService } from 'src/app/services/supplier.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CardService } from 'src/app/services/card.service';
@Component({
  selector: 'app-addcarte-purchase',
  templateUrl: './addcarte-purchase.component.html',
  styleUrls: ['./addcarte-purchase.component.scss']
})
export class AddcartePurchaseComponent implements OnInit {
 
  transactionForm!: FormGroup;
  cardForm!: FormGroup;
  profileForm!: FormGroup;
  cardPanierForm!:FormGroup;
  cardPanierTaille:any;
  
  supplierListe: any[]=[];
  cardListe: any[]=[];
  listeOperations: any[]=[];
  listeTransactions: any[]=[];
  listeCardPanier: any[]=[];
  transactionData:any;
  onLoading = false;
  qut =0;
  unit =0;
  mtht= 0;
 
  submitted = false;
  selected!: number;
  message:any;
  i = 1;

 amountHT!: number;



  constructor(private supplier: SupplierService,
    private purchase: PurchasesService,
     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder,
     private modalService: MdbModalService,
     private typeCardService: CardService,

     ) {


   this.getSupplierListe();
   this.getllTypeOfCards();

  }

  ngOnInit(): void {
    this.cardPanierTaille = this.cardListe.length;
    this.mtht = this.qut * this.unit;

    this.cardPanierForm = this.fb.group({
      carte: ['', [Validators.nullValidator]],
      // amount:['', [Validators.required]],
      unitPrice:['', [Validators.required]],
      quantity:['', [Validators.required]],
      amountHT:['', [Validators.required]],

    })
    this.transactionForm =  this.fb.group({
      supplier: ['', [Validators.required]],
      date: ['', [Validators.nullValidator]],


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


    this.cardForm = this.fb.group({
      name:['', [Validators.required]],
      description:['', [Validators.nullValidator]],
      // unitPrice:['', [Validators.required]],
    });

  }



  getSupplierListe(){
    this.supplier.getAllProviders().subscribe(data=>{
      this.supplierListe = data;

      
    })
  }




  ajouter(){
    this.onLoading = true;

    this.transactionData = this.transactionForm.value;
    
    
    let pipe = new DatePipe('en-US'); 
    const myFormattedDate = pipe.transform(this.transactionData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    let transaction:any= {
      // "operation": '/api/operations/'+this.transactionData.operation["id"]
      "date": myFormattedDate,
      "cardToTypeCardRelation":[],
      "provider": '/api/providers/'+this.transactionData.supplier["id"]
    }
    for(let cardPanier of this.listeCardPanier){
      // console.log(cardPanier);
      let obj ={
        "typeCardForSale": '/api/type_card_for_sales/'+cardPanier.carte.id,
        "amountHT": cardPanier.amountHT,
        "quantity": cardPanier.quantity, 
        "unitPrice":cardPanier.unitPrice,
      };
      transaction['cardToTypeCardRelation']=[...transaction['cardToTypeCardRelation'],obj]
    }

      this.purchase.createCardPurchase(transaction).then(resp=>{        
        this.toast.success({
          detail:"Transaction Réçu avec success",
          summary:"transaction effectuée avec success",
          duration: 3000
          });
          this.router.navigate(['/buttons/printcartepurchase']);
          
      }).catch(error=>{
        this.onLoading = false;
                
        this.toast.warning({
          detail:"Transaction Failed",
          summary:error.body.message,
          duration: 3000
          });
      });
    // debugger

      

  }

  openModal(content:any){
    this.modalService.open(content);
  }
  openCardModal(content:any){
    this.modalService.open(content);
  }


  get registerFormControl() {
    return this.profileForm.controls;
  }

  get registerCardForm() {
    return this.cardForm.controls;
  }



  ajouterclient() {


  
    if(this.profileForm.valid){
      this.submitted = true;
      let first = document.querySelector('.box') as HTMLElement | null;
      this.supplier.create(this.profileForm.value).then((res)=>{

        this.toast.success({
          detail:"Client ajouter",
          summary:"Client ajouter avec succes",
          duration: 3000
         });
         
         this.getSupplierListe();
         this.submitted = false;
         if (first != null) {
          first.style.display = "none";
        }
      }).catch(error=>{

        
        this.toast.warning({
          detail:error.body.message,
          summary:"",
          duration: 3000
         });
         
        this.submitted = false;

      });
    }


  }

  addPurchase(){
    // console.log(this.cardPanierForm.value);
    if(this.cardPanierForm.valid){
      this.listeCardPanier.push(this.cardPanierForm.value);
      this.cardPanierForm.reset();
    }
    
  }


  addcard(){
    this.typeCardService.createCard(this.cardForm.value).then(res=>{
      this.toast.success({
        detail:"Carte ajouter avec succes",
        summary:"carte ajouter",
        duration: 3000
        });
        this.getllTypeOfCards();
        this.cardForm.reset();

    }).catch(error=>{
    this.toast.warning({
      detail:error.body.message,
      summary:error.error.detail,
      duration: 3000
      });
   });
  }

  getllTypeOfCards(){
    this.typeCardService.getAllTypeOfCard().subscribe(data=>{
      this.cardListe = data;
    });
  }

}

