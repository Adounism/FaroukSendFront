import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-printcredit-purchase',
  templateUrl: './printcredit-purchase.component.html',
  styleUrls: ['./printcredit-purchase.component.scss']
})
export class PrintcreditPurchaseComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  transactionType:any[]=[];
  sendType = "";
  searchText = ""
  visible = false;
  creditPurchaseListe:any[]=[];
  typePurchase="purchaseOfCredits";
  userCardSell:any;

  constructor(private purchaseService:PurchasesService,
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,) { }

  ngOnInit(): void {
    this.getAllCreditPurchase();
    
  }


  getAllCreditPurchase(){
    this.purchaseService.getAllPurchase(this.typePurchase).subscribe(data=>{
      this.creditPurchaseListe = data;
      // console.log(this.creditPurchaseListe);


    })
  }


  toggleCollapse(): void {
    console.log("Hello");
    
    this.visible = !this.visible;
  }


  // onFilterChange(event: any){
  //   if(event.target.checked){
  //     this.getAllMobiletransaction(event.target.value, this.searchText);
      
  //   }else{
  //     this.getAllMobiletransaction(this.sendType, this.searchText);
  //   }
  //   console.log(event.target.value);
  //   console.log(event.target.checked);
    
    
  // }


  delete(id:number){
    this.ngxComfirmService.confirm({
      title:'Voulez-vous effacer achat de credit?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.purchaseService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Transaction supprimer",
                summary:"",
                duration: 3000
               });
               this.getAllCreditPurchase();
            }
            
          },
          error: error=>{

              this.toast.warning({
                detail:"La Transaction n'existe pas!!!",
                summary:error.body.message,
                duration: 3000
               });
          
          }
        });
      } else {
        console.log('Cancel');
      }
    });

  }

   
  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      this.creditPurchaseListe = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.purchaseService.findByRangeDateTransfertPurchase(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.creditPurchaseListe = data;
      })

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.creditPurchaseListe = [];
      this.purchaseService.findByRangeDateTransfertPurchase(fromdateFormate, todateFormate).subscribe(data=>{
        this.creditPurchaseListe = data;
      })
		} 
    else {
			this.toDate = null;
			this.fromDate = date;

      this.creditPurchaseListe = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.purchaseService.findByRangeDateTransfertPurchase(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.creditPurchaseListe = data;
      })

		}
	}

  isEmpty(fromDate: any, toDate:any){
    if(!fromDate || !toDate){
      // this.getAllMobiletransaction(this.sendType, this.searchText);
      this.getAllCreditPurchase()
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
    this.creditPurchaseListe = [];
    this.purchaseService.getSearchPurchase(this.searchText).subscribe(data=>{
      this.creditPurchaseListe = data;
      console.log(this.creditPurchaseListe);
      
   })
  }


}
