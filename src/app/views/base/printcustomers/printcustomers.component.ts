import { Component } from '@angular/core';
import {ClientService} from '../../../services/client.service';
import {Users} from '../../../models/Users';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from 'src/app/services/transactions.service';
import {Customers} from '../../../models/Customers';
@Component({
  selector: 'app-navs',
  templateUrl: './printcustomers.component.html',
  styleUrls: ['./printcustomers.component.scss']
})
export class PrintcustomersComponent {

  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;

  customers: Customers[]=[];
  page: number = 1;
  total: number = 0;
  searchText= "";
  visible = true;
  opt_total :any ;
  totalencaissement = 0;
  totaldecaissement = 0;
  totalsendBack = 0;
  ischeked :any;
  transactionType:any [] = [];

  constructor(private clientService: ClientService, private toast: NgToastService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private mobileTransaction: TransactionsService,
    private ngxComfirmService: NgxBootstrapConfirmService, private router: ActivatedRoute) {

  this.getAllClient();
  this.getAllTransactionTypes();

  }

  getAllTransactionTypes(){
    this.mobileTransaction.getAllSenType().subscribe(data=>{
      this.transactionType = data;
      console.log(this.transactionType);
    })
  }

  getAllClient(){
    this.clientService.getAllClientPage(this.page).subscribe(async data=>{
      this.customers = data;
      this.total = data.length;
      this.customers.reverse();
      // this.customers.forEach(element => {
      //   this.calculateTotals(element);
      // });
    },
    async error => {
    });

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
      console.log(this.customers);

   })
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      this.customers = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
      //   this.customers = data;
      // })

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.customers = [];
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, todateFormate).subscribe(data=>{
      //   this.customers = data;
      // })
		}
    else {
			this.toDate = null;
			this.fromDate = date;

      this.customers = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
      //   this.customers = data;
      // })

		}
	}

  deleteCustomer(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez-vous supprimer cette client?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.clientService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){

              this.toast.success({
                detail:"Encaissement supprimer",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllClient();
            }

          },
          error: error=>{
            this.toast.warning({
              detail:"Le client n'existe pas!!!",
              summary:error.body.message,
              duration: 3000
            });

          }
        });
      } else {
      }
    });
  }

    /**
   * Write code on Method
   *
   * @return response()
   */
     pageChangeEvent(event: number){
      this.page = event;
      this.getAllClient();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllClient();
  }
  onTableSizeChange(event: any): void {
    // this.tableSize = event.target.value;
    // this.page = 1;
    // this.fetchPosts();
  }

  onSearchChange(searchValue: string){

    this.customers=[];
    let term = searchValue.trim();

    this.clientService.searchCustomers(searchValue).subscribe(data=>{
      this.customers = data;

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




   calculateTotals(customer: Customers) {

    this.opt_total = {};
    customer.sends.forEach((send:any) => {
      if (!this.opt_total[send.sendType]) {
        this.opt_total[send.sendType] = 0;
      }
      this.opt_total[send.sendType] += send.amount;

    });
    return this.opt_total;
  }

  totalTransactionsTypeSend(customer:any){
    customer.sends.forEach((element: any) => {
    });
  }

  totalEncaissement(){

  }

  totalDecaissement(){

  }

  getTotalSend(customer:any){
    let send:number = 0;
    let sendback:number = 0;
    let collection:number = 0;
    let disbursement:number = 0;


    customer.sends.forEach((s:any)=>{
      if (s.sendType==="send") {
        send+=s.amount
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
    return {send,sendback,collection,disbursement};

  }
}

