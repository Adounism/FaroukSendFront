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
  businessForm!: FormGroup;
  individulForm!: FormGroup;

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

  default!:boolean;
  second!:boolean;
  supplierData:any;
 
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

  addPurchase(){
    // console.log(this.cardPanierForm.value);
    if(this.cardPanierForm.controls['amountHT'].touched){
      console.log(this.cardPanierForm.controls['amountHT']);
      
    }else{
      this.cardPanierForm.controls['amountHT'].setValue(this.amountHT);
  
    }
  
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

  updateAmount(){
    this.amountHT =this.qut * this.unit;
    console.log(this.amountHT);
    
  }

  onUnitPriceChange(event: any) {
    if(event.target.value){
      this.unit = event.target.value
      this.updateAmount()
    }
}

onQuantityChange(event: any) {
  if(event.target.value){
    this.qut = event.target.value
    this.updateAmount()
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

