import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { catchError } from 'rxjs';
import { TransactionsService } from 'src/app/services/transactions.service';


@Component({
  selector: 'app-printmobiletransaction',
  templateUrl: './printmobiletransaction.component.html',
  styleUrls: ['./printmobiletransaction.component.scss']
})
export class PrintmobiletransactionComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  mobileTransactions:any[]=[];
  transactionType:any[]=[];
  sendTypeCollection = "collection";
  searchText = ""
  visible = true;
  page: number = 1;
  total: number = 0;
  constructor(private mobileTransaction: TransactionsService,
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,) { }

  ngOnInit(): void {
    this.getAllMobileTransactions();
    this.getAllTransactionTypes();


  }


  toggleCollapse(): void {
    this.visible = !this.visible;
  }

  getAllMobileTransactions(){
    this.mobileTransaction.getAllMobileSends(this.page).subscribe(data=>{
      this.mobileTransactions = data;
      console.log(this.mobileTransactions);
    });
  }


  getAllMobiletransaction(type:string){

    this.mobileTransactions =[];
    this.mobileTransaction.getAllMobileSend(type).subscribe(data=>{
       this.mobileTransactions = data;


    })
  }

  onFilterChange(event: any){
    if(event.target.value != ""){
      this.getAllMobiletransaction(event.target.value);

    }else if(event.target.value == ""){
      console.log("Hello");

      this.getAllMobileTransactions();
    }
    console.log(event.target.value);
    console.log(event.target.checked);

  }




  deletetransaction(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez-vous supprimer cette Transaction?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.mobileTransaction.deletemobileTransfert(id).subscribe({
          next: data=>{
            if(data.status == 200){

              this.toast.success({
                detail:"Transaction supprimer",
                summary:"",
                duration: 3000
               });
               this.getAllMobileTransactions();
            }

          },
          error: error=>{
            if(error.status == 404){

              this.toast.warning({
                detail:"La Transaction n'existe pas!!!",
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

  getAllTransactionTypes(){
    this.mobileTransaction.getAllSenType().subscribe(data=>{
      this.transactionType = data;

    })
  }


  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      this.mobileTransactions = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.mobileTransactions = data;
      })

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.mobileTransactions = [];
      this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, todateFormate).subscribe(data=>{
        this.mobileTransactions = data;
      })
		}
    else {
			this.toDate = null;
			this.fromDate = date;

      this.mobileTransactions = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.mobileTransactions = data;
      })

		}
	}

  isEmpty(fromDate: any, toDate:any){
    if(!fromDate || !toDate){
      this.getAllMobileTransactions();
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

  searchTransactionByDateRange(from:any, to: any){

  }


  onsearch(event:any){
    this.searchText = event;
    this.mobileTransactions = [];
    this.mobileTransaction.getSearchMobileSend(this.searchText).subscribe(data=>{
      this.mobileTransactions = data;
      console.log(this.mobileTransactions);

   })
  }


      /**
   * Write code on Method
   *
   * @return response()
   */
      pageChangeEvent(event: number){
        this.page = event;
        this.getAllMobileTransactions();
    }

    onTableDataChange(event: any) {
      this.page = event;
      this.getAllMobileTransactions();
    }
}
