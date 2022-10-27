import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import {TransactionsService} from '../../../services/transactions.service';

@Component({
  selector: 'app-collapses',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{

  transactionForm!: FormGroup;
  clientListe: any[]=[];
  listeOperations: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;


  constructor(private clientService: ClientService,
     private transService: TransactionsService,
      private operationService: OperationsService) {
    
    this.getTransactionList();

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

  getTransactionList(){
    this.transService.getAllTransaction().subscribe(data=>{
      this.listeTransactions = data['hydra:member'];
      console.log(this.listeTransactions);
      
    })
  }

 

  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }

}
