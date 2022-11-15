import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss']
})
export class FormControlsComponent {

  historiqueData: any[]=[];
  transactionData: any[]=[];
  customerId! :number;
  searchText ='';
  listOperation:any[]=[];
  listUserOperation:any[]=[];

  operationTotal:any;
  userTransactionData:any[]=[];
  allOperationsName:any[]=[];
  clientTransNumber=0;
  transTaille:any;

  page: number = 1;
  total: number = 0;
  constructor(private clienService: ClientService, private route: ActivatedRoute,
    private router: Router,private transService: TransactionsService, private operationService:OperationsService ) {
   
  }
  ngOnInit(): void {

    this. getOperations();
    // this.getAllTransaction();
    
  }

  getOperations(){
    this.operationService.getAllOperations().subscribe(op=>{
      this.listOperation = op;
      this.allOperationsName = op.map((op:any)=>op['name'])
    this.getCustomerData();

    })
  }

  getUserOperations(client: any){
    let operations:any = {}
    this.allOperationsName.forEach((n:any)=>{
      operations[n]=0
    })
    client["transactions"].forEach((trans:any, index:number)=>{   
        let key = trans["operation"]["name"];
        
        if(operations[key]){
          operations[key] += trans["amount"];

        }else{
          operations[key] = trans["amount"];
        }
      })
      return Object.keys(operations).map((k:any)=>({"key":k,"value":operations[k]}));
  }


  getCustomerData(){
    this.clienService.getAllClientPage(this.page).subscribe(data=>{

      this.historiqueData = data;
      data.forEach((d:any)=>{
        // console.log(d);
        this.getUserOperations(d);
        this.getUserTransactionNombre(d);
        
      })
      
      // console.log(data.transactions);
    
      // this.historiqueData = data;
      
      
      // this.userTransactionData = data;
      // // console.log(this.userTransactionData);
      // let operations:any = {};
      this.userTransactionData.forEach((trans, index)=>{   
        // console.log(trans.transactions[index]["operation"]["name"]);
      
        let key = trans.transactions;
        // if(operations[key]){
        //   operations[key] += trans["amount"];

        // }else{
        //   operations[key] = trans["amount"];
        // }
        
      })
      // this.operationTotal = operations;
 
      
    });
      
    
  }

  getUserTransactionNombre(client:any){
    let transnUmber = 0;
    client["transactions"].forEach((trans:any, index:number)=>{ 
      this.transTaille = trans;
      console.log(transnUmber +=1);
      
    })


  }

  
}
