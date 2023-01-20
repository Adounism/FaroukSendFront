import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import {SupplierService} from '../../../services/supplier.service';

@Component({
  selector: 'app-navs',
  templateUrl: './printsuppliers.component.html',
  styleUrls: ['./printsuppliers.component.scss']
})
export class PrintsupplierComponent implements OnInit{



  purchaseOfCredits =  "purchaseOfCredits";
  mobileTransferPurchase = "mobileTransferPurchase";
  individualProvider = "individual"
  businessProvider = "business"


  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  providers: any[]=[];
  ischeked :any;
  visible = true;
  constructor(private supplierService: SupplierService,
    private toast: NgToastService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private ngxComfirmService: NgxBootstrapConfirmService ) { }
  ngOnInit(): void {
    this.getAllProviders();

  }

  getAllProviders(){

    this.supplierService.getAllProviders().subscribe(async data=>{
      this.providers = data;
      console.log(this.providers);


    },
    async error => {
      console.log(error.message);
    });

  }


  toggleCollapse(): void {
    this.visible = !this.visible;
  }



  onFilterChange(event: any){
    if(event.target.value != ""){
      this.ischeked = event.target.value;
      // this.getCustomersTans(event.target.value);


    }else if(event.target.value == ""){
      // this.getAllMobileTransactions();
    }

  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      this.providers = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
      //   this.customers = data;
      // })

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.providers = [];
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, todateFormate).subscribe(data=>{
      //   this.customers = data;
      // })
		}
    else {
			this.toDate = null;
			this.fromDate = date;

      this.providers = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      // this.mobileTransaction.findByRangeDateTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
      //   this.customers = data;
      // })

		}
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


  deletesupplier(id: number){
    this.ngxComfirmService.confirm({
      title:'Voulez-vous supprimer cette Fournisseur?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.supplierService.delete(id).subscribe({
          next: data=>{
            this.toast.success({
              detail:"Founisseur supprimer",
              summary:data.body.message,
              duration: 3000
              });

            this.getAllProviders();

          },
          error: error=>{
            if(error.status == 404){
              this.toast.warning({
                detail:"Founisseur inexistant !!!",
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


  getTotalPurchase(provider:any){
    let creditPurchase:number = 0;
    let mobileTransferPurchase:number = 0;
    let collection:number = 0;
    let disbursement:number = 0;


    provider.purchases.forEach((s:any)=>{
      if (s.typePurchase==="purchaseOfCredits") {
        creditPurchase+=s.amount
      }
      if (s.typePurchase==="mobileTransferPurchase") {
        mobileTransferPurchase+=s.amount
      }
      if (s.sendType==="collection") {
        collection+=s.amount
      }
      if (s.sendType==="disbursement") {
        disbursement+=s.amount
      }
    })
    return {creditPurchase,mobileTransferPurchase};

  }

  getTotalCartePurchase(provider:any){
    let totalCarte:number = 0;
    provider.cardPurchases.forEach((c:any)=>{
      c.cardToTypeCardRelation.forEach((element:any) => {
        totalCarte += element.amountHT;
      });

    })
    return {totalCarte};
  }


  getIndividuallProviders(type:any){
    console.log(type.target.value);

    if(type.target.value == "All"){
      this.getAllProviders()
    }else{

      this.providers = [];
      this.supplierService.getProviderByType(type.target.value).subscribe(data=>{
        this.providers = data;
      })
    }

  }

}

