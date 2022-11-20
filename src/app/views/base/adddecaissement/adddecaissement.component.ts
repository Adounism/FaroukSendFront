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
  selector: 'app-adddecaissement',
  templateUrl: './adddecaissement.component.html',
  styleUrls: ['./adddecaissement.component.scss']
})
export class AdddecaissementComponent implements OnInit {
  transactionForm!: FormGroup;
  profileForm!: FormGroup;
  clientListe: any[]=[];
  // listeOperations: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;
  onLoading = false;

  submitted = false;
  
  selected!: number;
  message:any;


  constructor(private fb: FormBuilder,private toast: NgToastService,
    private transService: TransactionsService,
    private operationService: OperationsService,
    private router:Router, ) { }

  ngOnInit(): void {
    this.transactionForm =  this.fb.group({
      date: ['', [Validators.nullValidator]],
      // numeroPdv: ['', [Validators.nullValidator]],
      description: ['', [Validators.nullValidator]],
      numberReceived: ['', [Validators.nullValidator]],
      collectionType:['disbursement', [Validators.nullValidator]],
      amount:['', [Validators.required]],


    });


    // this.profileForm = this.fb.group({
    //   firstName: ['', [Validators.required]],
    //   lastName: ['', [Validators.required]],
    //   address: ['', [Validators.nullValidator]],

    //   phone: ['', [Validators.required, Validators.minLength(4)]],

    //   email: ['', [Validators.nullValidator]],
    //   occupation: ['', [Validators.nullValidator]],
    //   pdvNumber: ['', [Validators.nullValidator]],

    //   //typeClient:['', [Validators.required]]
    // });





  }



  ajouter(){


    if(this.transactionForm.valid){
      this.onLoading = true;
      let pipe = new DatePipe('en-US'); 
      console.log(this.transactionForm.value);
      this.transactionData = this.transactionForm.value;
      const myFormattedDate = pipe.transform(this.transactionData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      let transaction= {
        "date": myFormattedDate,
        "description": this.transactionData.description ,
        "numberReceived": this.transactionData.numberReceived,
        "collectionType": this.transactionData.collectionType,
        "amount": this.transactionData.amount
      }

      if(this.transactionData.amount != "" && this.transactionData.amount > 0){

        this.transService.createtresorieOpe(transaction).then(resp=>{

          this.toast.success({
            detail:"Décaissement effectués avec succes",
            summary:"Décaissement",
            duration: 3000
            });
            this.router.navigate(['/base/decaissement']);
            
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
          summary:"Décaissement impossible montant invalid",
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
}
