
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CardService } from 'src/app/services/card.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addcardsale',
  templateUrl: './addcardsale.component.html',
  styleUrls: ['./addcardsale.component.scss']
})
export class AddcardsaleComponent implements OnInit {

  transactionForm!: FormGroup;
  cardForm!: FormGroup;
  profileForm!: FormGroup;
  cardPanierForm!:FormGroup;
  cardPanierTaille:any;
  
  clientListe: any[]=[];
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


  constructor(private clientService: ClientService,
    private transService: TransactionsService,
     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder,
     private modalService: MdbModalService,
     private typeCardService: CardService,

     ) {


   this.getClientList();
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
      amountHT:['', [Validators.nullValidator]],

    })
    this.transactionForm =  this.fb.group({
      client: ['', [Validators.required]],
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



  getClientList(){
    this.clientService.getAllClient().subscribe(data=>{
      this.clientListe = data;

      
    })
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


  ajouter(){


    if(this.transactionForm.valid){
      this.onLoading = true;

      this.transactionData = this.transactionForm.value;
  
      
      let pipe = new DatePipe('en-US'); 
      const myFormattedDate = pipe.transform(this.transactionData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      let transaction:any= {
        "client": '/api/clients/'+this.transactionData.client["id"],
        // "operation": '/api/operations/'+this.transactionData.operation["id"]
        "date": myFormattedDate,
        "cardToTypeCardRelation":[]
      }
      for(let cardPanier of this.listeCardPanier){
       
    
        let obj ={
          "typeCardForSale": '/api/type_card_for_sales/'+cardPanier.carte.id,
          
          "quantity": cardPanier.quantity, 
          "unitPrice":cardPanier.unitPrice,
          "amountHT": cardPanier.amountHT,
        };
        transaction['cardToTypeCardRelation']=[...transaction['cardToTypeCardRelation'],obj]
        console.log(transaction);
      }

        this.transService.saleCard(transaction).then(resp=>{
   

          
          this.toast.success({
            detail:"Transaction Réçu avec success",
            summary:"transaction effectuée avec success",
            duration: 3000
            });
            this.router.navigate(['/vente-carte/printcardsale']);
            
        });

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
      if(this.listeCardPanier.length < 0 ){

        this.toast.warning({
          detail:"veillez ajoute un carte dans la liste",
          summary:"",
          duration: 3000
          });

      }else{

        let first = document.querySelector('.box') as HTMLElement | null;
        this.clientService.create(this.profileForm.value).then((res)=>{
  
          this.toast.success({
            detail:"Client ajouter",
            summary:"Client ajouter avec succes",
            duration: 3000
           });
           
           this.getClientList();
           this.submitted = false;
           if (first != null) {
            first.style.display = "none";
          }
        }).catch(error=>{
          console.log(error);
          
          this.submitted = false;
          this.toast.warning({
            detail:error.body.message,
            summary:error.error.detail,
            duration: 3000
            });
  
        });
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


  delete(index: number) {
    this.listeCardPanier.splice(index, 1);
    console.log("deleted");
    

  }


  addcard(){
    console.log(this.cardForm.value);
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

