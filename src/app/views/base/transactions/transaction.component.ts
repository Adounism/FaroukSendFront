import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import {TransactionsService} from '../../../services/transactions.service';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
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
      private operationService: OperationsService,
      private ngxComfirmService: NgxBootstrapConfirmService,
      private toast: NgToastService) {
    
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
      this.listeTransactions = data;
      console.log(this.listeTransactions);
      
    })
  }

  deleteTransaction(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez vous effacer cette Transaction?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.transService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Transaction deleted",
                summary:data.body.message,
                duration: 3000
               });
               this.getTransactionList();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"La transaction est inexistante!!!",
                summary:error.body.message,
                duration: 3000
               });
            } 
          }
        });
      } else {
        console.log('Cancel');
      }
    });


  }
 

  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }

}
