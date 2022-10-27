import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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


  constructor(private clientService: ClientService,
    private transService: TransactionsService,
     private operationService: OperationsService) {
   

   this.getClientList();
   this.getOperationList();
  }

  ngOnInit(): void {
   
    this.transactionForm = new FormGroup({
  
      montant: new FormControl([
        Validators.required,
        Validators.minLength(2),
      ]),
  
      client: new FormControl([
        Validators.required,
      ]),
      operation: new FormControl([
        Validators.required,
      ]),
  
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

      this.transactionData = this.transactionForm.value;

      let transaction= {
        "amount": this.transactionData.montant,
        "client":{
          "firstName": this.transactionData.client.firstName,
          "lastName": this.transactionData.client.lastName,
          "email": this.transactionData.client.email,
          "phone": this.transactionData.client.phone,
          "address": this.transactionData.client.address,
          "occupation": this.transactionData.client.occupation,
          "pdvNumber": this.transactionData.client.pdvNumber
        },
        "operation": {
          "name": this.transactionData.operation.name,
          "description": this.transactionData.operation.description
        }
      }
      this.transService.createTransaction(transaction).then(resp=>{
        console.log(resp);
          
      });
    }
  }

}
