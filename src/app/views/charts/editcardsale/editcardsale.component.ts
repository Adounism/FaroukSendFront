import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DatePipe } from '@angular/common';
import { CardService } from 'src/app/services/card.service';
@Component({
  selector: 'app-editcardsale',
  templateUrl: './editcardsale.component.html',
  styleUrls: ['./editcardsale.component.scss']
})
export class EditcardsaleComponent implements OnInit {
  transactionForm!: FormGroup;
  cardForm!: FormGroup;
  profileForm!: FormGroup;
  
  clientListe: any[]=[];
  listeOperations: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;
  onLoading = false;
  cardId!:number;
  currentCardData:any;
  cardListe: any[]=[];
  cardArray:any[]=[];


 
  submitted = false;
  selected!: number;
  message:any;
  i = 1;


  constructor(
    private clientService: ClientService,
    private transService: TransactionsService,
     private operationService: OperationsService,
     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder,
     private route:ActivatedRoute,
     private modalService: MdbModalService,
     private typeCardService: CardService,
  ) { 
    this.cardId = this.route.snapshot.params['id'];
    console.log(this.cardId);
    
  }

  ngOnInit(): void {

    this.getCurrentCard(this.cardId);
    this.getllTypeOfCards();

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
      unitPrice:['', [Validators.required]],
    })


  }

  getCurrentCard(id:number){
    this.transService.findSellingCard(id).subscribe(data=>{
      this.currentCardData = data;
      console.log(this.currentCardData);
      // this.cardArray = data.cardToTypeCardRelation;
      

      
    },error=>{
      if(error.status == 404){
        this.router.navigate(['/404']);
      }
    });
  }

  update(form:NgForm){
    console.log(form.value);
    
  }

  delete(index: number) {
    this.cardArray.splice(index, 1);
    console.log("deleted");
    

  }


  ajouter(form:NgForm){

    this.transactionData = form.value;
    console.log(this.transactionData);
    if(form){
      this.onLoading = true;
      let transaction= {
        // "client": '/api/clients/'+this.transactionData.client["id"],
        // "date": myFormattedDate,
        "typeCardForSale":'/api/type_card_for_sales/'+this.transactionData.carte['id'],
        "quantity": this.transactionData.quantity, 
        "unitPrice":this.transactionData.unitPrice,
        "amountHT": this.transactionData.amountHT,
      }

      if(this.transactionData.carte['id'] == undefined){
        this.onLoading = false;

        this.toast.warning({
          detail:"Veillez selectionner un type de carte",
          summary:"",
          duration: 3000
          });

      }else{

        this.transService.editCardSelling(this.cardId, transaction).subscribe(data=>{
            this.toast.success({
              detail:"Transaction Réçu avec success",
              summary:"transaction effectuée avec success",
              duration: 3000
              });
              this.router.navigate(['/vente-carte/printcardsale']);
              
          
        },error=>{
          this.onLoading = false;
  
          this.toast.warning({
            detail:error.body.message,
            summary:"Modification échouer veillez ressayer!!",
            duration: 3000
            });
  
        })
      }

      // debugger
      // if(""){

      //   this.transService.saleCard(transaction).then(resp=>{

      //     this.toast.success({
      //       detail:"Transaction Réçu avec success",
      //       summary:"transaction effectuée avec success",
      //       duration: 3000
      //       });
      //       this.router.navigate(['/base/transaction']);
            
      //   });
      // }else{
      //   this.onLoading = false;

      //   this.toast.warning({
      //     detail:"Transaction Montant error",
      //     summary:"transaction impossible montant invalid",
      //     duration: 3000
      //     });
      // }
      
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
      let first = document.querySelector('.box') as HTMLElement | null;
      this.clientService.create(this.profileForm.value).then((res)=>{

        this.toast.success({
          detail:"Client ajouter",
          summary:"Client ajouter avec succes",
          duration: 3000
         });
         
         this.submitted = false;
         if (first != null) {
          first.style.display = "none";
        }
      }).catch(error=>{
        console.log(error);
        
        this.submitted = false;

      });
    }
  }
  
  addcard(){
    console.log(this.cardForm.value);

  }

  getllTypeOfCards(){
    this.typeCardService.getAllTypeOfCard().subscribe(data=>{
      this.cardListe = data;
      console.log(this.cardListe);
      
    });
  }
  

}
