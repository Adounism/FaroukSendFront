import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './edittransaction.component.html',
  styleUrls: ['./edittransaction.component.scss']
})
export class EditTransactionComponent implements OnInit{
  transactionForm!: FormGroup;
  clientListe: any[]=[];
  listeOperations: any[]=[];
  currentTransaction:any;
  transactionId!:number;
  transactionData:any;
  onLoading= false;

  constructor(private route: ActivatedRoute,
     private transService: TransactionsService,
    private toast: NgToastService,private router: Router,
    private fb: FormBuilder,
    private clientService: ClientService,
    private operationService: OperationsService) { 

    this.transactionId = this.route.snapshot.params['id'];
    this.getTransactionById(this.transactionId);
    this.getClientList();
    this.getOperationList();

  }
  ngOnInit(): void {
    // this.transactionForm = this.fb.group({
    //   amount: ['', [Validators.required]],
  
    //   client: ['', [Validators.required]],
    //   operation: ['', [Validators.required]],
  
    // });
  }

  getTransactionById(id:number){
    this.transService.find(id).subscribe(data=>{
      this.currentTransaction = data;

      
    },error=>{
      if(error.status == 404){
        this.router.navigate(['/404']);
      }
      
    });
  }

  getClientList(){
    this.clientService.getAllClient().subscribe(data=>{
      this.clientListe = data;

      
    })
  }

  getOperationList(){
    this.operationService.getAllOperations().subscribe(response=>{
      this.listeOperations = response;
    })
  }

  ajouter(form:NgForm){
    this.transactionData = form.value;
    if(this.transactionData.amount != "" && this.transactionData.amount > 0){
      this.onLoading = true;
      let data = {
        "amount": this.transactionData.amount,
        "client": this.transactionData.client["@id"],
        "operation": this.transactionData.operation["@id"]
      }
      this.transService.editTransaction(this.transactionId, data).subscribe(datat=>{
        console.log(data);
        this.toast.success({
          detail:"Transaction  update success",
          summary:"",
          duration: 3000
         });
         this.router.navigate(['/base/transaction']);
        },error=>{
          this.onLoading = false;
          this.toast.error({
            detail:"Traitment error please try again",
            summary:"",
            duration: 3000
           });
        })
    }else{
      this.onLoading = false;
      this.toast.warning({
        detail:"field amount error",
        summary:"please provide a positive number!!",
        duration: 3000
       });
    }

  }

}
