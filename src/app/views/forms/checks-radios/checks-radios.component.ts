import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs';
@Component({
  selector: 'app-checks-radios',
  templateUrl: './checks-radios.component.html',
  styleUrls: ['./checks-radios.component.scss']
})
export class ChecksRadiosComponent {

  historiqueData: any[]=[];
  transactionData: any[]=[];
  customerId! :number;
  searchText ='';
  listOperation:any[]=[];
  listUserOperation:any[]=[];

  operationTotal:any;
  userData:any[]=[];
  allOperations:any[]=[];
  nombreoperationTotal:any;
  listeTransactions:any[]=[];

  page: number = 1;
  total: number = 0;
  constructor(private clienService: ClientService, private route: ActivatedRoute,
    private router: Router,private transService: TransactionsService, private operationService:OperationsService ) {

  }
  ngOnInit(): void {

    // this. getOperations();
    // this.getAllTransaction();
    this.getTransactionList();
    // this.getAllCustomers();

  }

  getAllCustomers(){
    this.clienService.getAllClient().subscribe(data=>{
      this.userData = data;
      let operations:any[] = [];
      data.forEach((user:any)=>{
        user['transactions'].forEach((t:any)=>{
          let operationName = t['operation']?.['name'];
          let existObject:any = operations.find((op)=>op["key"]===operationName);
          // debugger
          if (existObject) {
            existObject["value"]+= t["amount"];
          }else{
            let obj:any = {}
            obj["key"]=operationName;
            obj["value"]=t["amount"];

            operations.push(obj);
            this.operationTotal = operations.length;

          }
        })
      })
      this.allOperations = operations;
    })
  }

  getTransactionList(){
    this.transService.getAllTransaction(this.page).subscribe(data=>{
      this.listeTransactions = data;
      console.log(this.listeTransactions);

    })
  }

  // getOperations(){
  //   this.operationService.getAllOperations().subscribe(op=>{
  //     this.listOperation = op;
  //     // this.allOperationsName = op.map((op:any)=>op['name'])
  //   // this.getCustomerData();

  //   })
  // }

  // getUserOperations(client: any){
  //   let operations:any = {}
  //   this.allOperationsName.forEach((n:any)=>{
  //     operations[n]=0
  //   })
  //   client["transactions"].forEach((trans:any, index:number)=>{
  //       let key = trans["operation"]["name"];
  //       if(operations[key]){
  //         operations[key] += trans["amount"];

  //       }else{
  //         operations[key] = trans["amount"];
  //       }
  //     })
  //     return Object.keys(operations).map((k:any)=>({"key":k,"value":operations[k]}));
  // }


  // getAllTransaction(){
  //   this.transService.getAllTransaction().subscribe(response=>{
  //     this.transactionData = response;
  //     console.log(this.transactionData);
  //     let operations:any = {};

  //     this.transactionData.forEach(trans=>{
  //       let key = trans["operation"]["name"];
  //       if(operations[key]){
  //         operations[key] += trans["amount"];

  //       }else{
  //         operations[key] = trans["amount"];
  //       }

  //     })
  //     this.operationTotal = operations;
  //   });




  // }


  getCustomerData(){
    this.clienService.getAllClientPage(this.page).subscribe(data=>{

      this.historiqueData = data;
      data.forEach((d:any)=>{
        // console.log(this.getUserOperations(d));

      })

      // console.log(data.transactions);

      // this.historiqueData = data;


      // this.userTransactionData = data;
      // // console.log(this.userTransactionData);
      // let operations:any = {};
      // this.userTransactionData.forEach((trans, index)=>{
      //   // console.log(trans.transactions[index]["operation"]["name"]);

      //   let key = trans.transactions[index]["operation"]["name"];
      //   if(operations[key]){
      //     operations[key] += trans["amount"];

      //   }else{
      //     operations[key] = trans["amount"];
      //   }

      // })
      // this.operationTotal = operations;
      // console.log(this.operationTotal);

    });


  }


}
