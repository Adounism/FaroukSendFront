import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
  transactionType:any [] = [];
  visible = true;
  page: number = 1;
  total: number = 0;


  ischeked :any;
  totals:any;
  constructor(private clienService: ClientService, private route: ActivatedRoute,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private transactionServicce: TransactionsService,
    private mobileTransaction: TransactionsService,
    private router: Router,private transService: TransactionsService, private operationService:OperationsService ) {

  }
  ngOnInit(): void {

    // this. getOperations();
    this.getAllTransactionTypes();
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


  getAllTransactionTypes(){
    this.mobileTransaction.getAllSenType().subscribe(data=>{
      this.transactionType = data;
    })
  }

  onFilterChange(event: any){
    if(event.target.value != ""){
      this.ischeked = event.target.value;
      // this.getCustomersTans(event.target.value);


    }else if(event.target.value == ""){
      // this.getAllMobileTransactions();
    }

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
    this.clienService.getAllClientPage(this.page).subscribe(data=>{

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





}
