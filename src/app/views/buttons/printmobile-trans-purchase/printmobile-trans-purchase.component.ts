import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-printmobile-trans-purchase',
  templateUrl: './printmobile-trans-purchase.component.html',
  styleUrls: ['./printmobile-trans-purchase.component.scss']
})
export class PrintmobileTransPurchaseComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  transactionType:any[]=[];
  sendType = "";
  searchText = ""
  visible = true;
  mobileTransfertListe:any[]=[];
  searchdate!: NgbDate | null;
  typePurchase = "mobileTransferPurchase";
  constructor(private purshaseService: PurchasesService,
    private ngxComfirmService: NgxBootstrapConfirmService,
    private toast: NgToastService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,) { }

  ngOnInit(): void {
    // this.isEmpty(this.searchdate);
     this.getAllMobileTransfertPurchase();
  }

  getAllMobileTransfertPurchase(){
    this.purshaseService.getAllPurchase(this.typePurchase).subscribe(data=>{
      this.mobileTransfertListe = data;
    });

  }

  delete(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez vous effacer cette Transaction?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.purshaseService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Transfert Mobile supprimer",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllMobileTransfertPurchase();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"Transfert Mobile inexistant!!!",
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
  toggleCollapse(): void {
    this.visible = !this.visible;
  }




  // onDateSelection(date: NgbDate){
  //   if(date){

  //     let fromdateFormate = date.year+'-'+date.month+'-'+date.day;
  //     console.log(fromdateFormate);
      
      
  //   }
  // }


   
  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      this.mobileTransfertListe = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.purshaseService.findByRangeDateTransfertPurchase(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.mobileTransfertListe = data;
      })

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.mobileTransfertListe = [];
      this.purshaseService.findByRangeDateTransfertPurchase(fromdateFormate, todateFormate).subscribe(data=>{
        this.mobileTransfertListe = data;
      })
		} 
    else {
			this.toDate = null;
			this.fromDate = date;

      this.mobileTransfertListe = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.purshaseService.findByRangeDateTransfertPurchase(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.mobileTransfertListe = data;
      })

		}
	}

  isEmpty(fromDate: any, toDate:any){
    if(!fromDate || !toDate){
      // this.getAllMobileTransfertPurchase(this.sendType, this.searchText);
      this.getAllMobileTransfertPurchase();
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
    this.mobileTransfertListe = [];
    this.purshaseService.getSearchPurchase(this.searchText).subscribe(data=>{
      this.mobileTransfertListe = data;
      console.log(this.mobileTransfertListe);
      
   })
  }
}
