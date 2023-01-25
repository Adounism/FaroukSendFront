import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { count } from 'rxjs';
import { Customers } from 'src/app/models/Customers';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss']
})
export class FormControlsComponent {

  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;

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
  customers: Customers[]=[];
  transactionType:any [] = [];
  visible = true;
  page: number = 1;
  total: number = 0;


  ischeked :any;
  totals:any;

  //SORTING
  isAscending: boolean = true;
  sortColumn!: string;

  Total_sendBack = 0;
  Total_transaction = 0;
  constructor(private clientService: ClientService, private route: ActivatedRoute,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private transactionServicce: TransactionsService,
    private mobileTransaction: TransactionsService,
    private router: Router,private transService: TransactionsService, private operationService:OperationsService ) {

  }
  ngOnInit(): void {


    this.getAllTransactionTypes();
    this.getAllClient();
    this.getClientTransaction();
    // this.getCustomerData();
    // this.getAllTransaction();

  }

  // getOperations(){
  //   this.operationService.getAllOperations().subscribe(op=>{
  //     this.listOperation = op;
  //     this.allOperationsName = op.map((op:any)=>op['name'])
  //   this.getCustomerData();

  //   })
  // }



  getAllClient(){
    this.clientService.getAllClientPage(this.page).subscribe(async data=>{
      this.customers = data;
      this.customers.reverse();
    },
    async error => {
    });

  }


  getAllTransactionTypes(){
    this.mobileTransaction.getAllSenType().subscribe(data=>{
      this.transactionType = data;
    })
  }

  onFilterChange(event: any){
    if(event.target.value != ""){
      this.ischeked = event.target.value;
      this.getCustomersTans(event.target.value);


    }else if(event.target.value == ""){
      // this.getAllMobileTransactions();
    }

  }

  getCustomersTans(type:any){
    this.customers = [];
    this.clientService.getSendType(type).subscribe((data:any)=>{
      this.customers = data;


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

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      this.historiqueData = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
      //   this.customers = data;
      // })

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.historiqueData = [];
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, todateFormate).subscribe(data=>{
      //   this.customers = data;
      // })
		}
    else {
			this.toDate = null;
			this.fromDate = date;

      this.historiqueData = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
      //   this.customers = data;
      // })

		}
	}



  getCustomerData(){
    this.clientService.getAllClientPage(this.page).subscribe(data=>{

      this.historiqueData = data;
      // data.forEach((d:any)=>{
      //   // console.log(d);
      //   this.getUserOperations(d);
      //   this.getUserTransactionNombre(d);

      // })

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


  isEmpty(fromDate: any, toDate:any){
    if(!fromDate || !toDate){
      // this.getAllMobileTransactions();
    }
  }

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}


  toggleCollapse(): void {
    this.visible = !this.visible;
  }

  getTotalSend(customer:any){
    let send:number = 0;
    let sendback:number = 0;
    let collection:number = 0;
    let disbursement:number = 0;




    customer.sends.forEach((s:any)=>{
      if (s.sendType==="send") {
        send+=s.amount
        this.Total_transaction =+ send;
      }
      if (s.sendType==="sendBack") {
        sendback+=s.amount

      }
      if (s.sendType==="collection") {
        collection+=s.amount
      }
      if (s.sendType==="disbursement") {
        disbursement+=s.amount
      }
    })
    this.Total_sendBack = this.Total_sendBack+ sendback;
    return {send,sendback,collection,disbursement};

  }




  sortData(sortColumn: string) {
    // toggle the sort order

    this.sortColumn = sortColumn;

    this.isAscending = !this.isAscending;

    // sort the data
    this.customers.sort((a:any, b:any) => {
      if (a[this.sortColumn] < b[this.sortColumn]) {
        return this.isAscending ? -1 : 1;
      } else if (a[this.sortColumn] > b[this.sortColumn]) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }


  //GET CLIENT TRANSACTION FOR TABLE VENTE DE CREDIT
  getClientTransaction(){
    this.transactionServicce.getAllTransaction(this.page).subscribe(data=>{
      console.log(data);
      this.calculateTotalTransactionAmount(data);
    })
  }

   calculateTotalTransactionAmount(transactions: any[]) {
    this.totals = new Map<string, number>();
    for (let transaction of transactions) {
      let clientId = transaction.client.id;
      let currentTotal = this.totals.get(clientId) || 0;
      this.totals.set(clientId, currentTotal + transaction.amount);
    }

    console.log(this.totals);

    return this.totals;
  }


}
