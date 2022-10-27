import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-placeholders',
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  clientListe: any[]=[];
  listeOperations: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;
  onLoading = false;

  constructor(private clientService: ClientService,
    private transService: TransactionsService,
     private operationService: OperationsService,
     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder) {
   

   this.getClientList();
   this.getOperationList();
  }

  ngOnInit(): void {
   
    this.transactionForm =  this.fb.group({
      client: ['', [Validators.required]],
      operation: ['', [Validators.required]],
      montant:['', [Validators.required]],

    });
  }

  getClientList(){
    this.clientService.getAllClient().subscribe(data=>{
      this.clientListe = data['hydra:member'];

      
    })
  }

  getOperationList(){
    this.operationService.getAllOperations().subscribe(response=>{
      this.listeOperations = response['hydra:member'];

      
    })
  }

  ajouter(){

    if(this.transactionForm.valid){
      this.onLoading = true;

      this.transactionData = this.transactionForm.value;
      let transaction= {
        "amount": this.transactionData.montant,
        "client": this.transactionData.client["@id"] ,
        "operation": this.transactionData.operation["@id"]
      }
      if(this.transactionData.montant != "" && this.transactionData.montant > 0){

        this.transService.createTransaction(transaction).then(resp=>{

          this.toast.success({
            detail:"Transaction Réçu avec success",
            summary:"transaction effectuée avec success",
            duration: 3000
            });
            this.router.navigate(['/base/transaction']);
            
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

}
