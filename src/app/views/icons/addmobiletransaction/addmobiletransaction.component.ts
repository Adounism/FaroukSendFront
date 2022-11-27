import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-addmobiletransaction',
  templateUrl: './addmobiletransaction.component.html',
  styleUrls: ['./addmobiletransaction.component.scss']
})
export class AddmobiletransactionComponent implements OnInit {

  transactionForm!: FormGroup;
  profileForm!: FormGroup;
  clientListe: any[]=[];
  listeSendTypes: any[]=[];
  listeTypePurchase: any[]=[];
  transactionData:any;
  onLoading = false;


 
  submitted = false;
  selected!: number;
  message:any;


  constructor(private clientService: ClientService,
    private transService: TransactionsService,
     private operationService: OperationsService,
     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder,
     private modalService: MdbModalService,
     ) {
   

   this.getClientList();
   this.getTypePurchase();
  }

  ngOnInit(): void {
   
    this.transactionForm =  this.fb.group({
      client: ['', [Validators.required]],
      date: ['', [Validators.nullValidator]],
      amount:['', [Validators.required]],
      operation:['', [Validators.nullValidator]],

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

  getClientList(){
    this.clientService.getAllClient().subscribe(data=>{
      this.clientListe = data;

      
    })
  }

  getTypePurchase(){
    this.transService.getAllSenType().subscribe(response=>{
      this.listeSendTypes = response;
    });
  }

  ajouter(){


    if(this.transactionForm.valid){
      this.onLoading = true;
      this.transactionData = this.transactionForm.value;  
      let pipe = new DatePipe('en-US'); 
      const myFormattedDate = pipe.transform(this.transactionData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      let transaction= {
        "amount": this.transactionData.amount,
        "client": '/api/clients/'+this.transactionData.client["id"],
        "date": myFormattedDate,
        "sendType":this.transactionData.operation["key"]
      }

      console.log(transaction);
      if(this.transactionData.amount != "" && this.transactionData.amount > 0){

        this.transService.maketeMobileSend(transaction).then(resp=>{

          this.toast.success({
            detail:"Transaction Réçu avec success",
            summary:"transaction effectuée avec success",
            duration: 3000
            });
            this.router.navigate(['/icons/printmobiletransaction']);
            
        }).catch(error=>{
          this.onLoading = false;
          console.log(error);
          
          this.toast.warning({
            detail:"Opération error",
            summary: error.error.detail,
            duration: 4000
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

      });
    }


  }


}

