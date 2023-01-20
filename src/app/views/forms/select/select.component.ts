import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { count } from 'rxjs';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TransactionsService } from 'src/app/services/transactions.service';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  searchText ='';

  // historiqueAchats:any[]=[];
  supplierData:any;
  page: number = 1;
  total: number = 0;



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

  constructor( private route: ActivatedRoute,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private router: Router, private supplierService: SupplierService, private purchaseService: PurchasesService) {

  }
  ngOnInit(): void {
    this.getAllSupplier();
  }

  // getAchatHistorique(){
  //   this.purchaseService.getAllPurchase().subscribe(op=>{
  //     this.historiqueAchats = op;
  //     this.getSupplierPurchase(this.historiqueAchats);
  //   });
  // }

  getProviderTotalPurchase(provider:any){
    let total = 0;

    provider['purchases'].forEach((p:any)=>{
      total+=p['amount'];



    })

    return total;
  }

  getProviderTotalPurchaseNumber(provider:any){
    let total = 0;
    let pCount=0;
    provider['purchases'].forEach((p:any)=>{
      // total+=p['amount'];
      pCount ++;


    })
    // console.log(pCount);

    return pCount;
  }


  getProviderName(provider:any){
    let name = "Aucun"
    if (provider['individual']!==null) {
      name = provider['individual']['firstName']+" "+provider['individual']['lastName']
    }
    if (provider['business']!==null) {
      name = provider['business']['name']
    }
    return name
  }


  getAllSupplier(){
    this.supplierService.getAllProviders().subscribe(data=>{
      this.supplierData = data;


    })
  }



  // getSupplierPurchase(supplier: any){
  //   let achat:any = {}

  //   supplier["purchases"].forEach((trans:any, index:number)=>{

  //     console.log(trans);

  //       let key = trans["operation"]["name"];
  //       if(achat[key]){
  //         achat[key] += trans["amount"];

  //       }else{
  //         achat[key] = trans["amount"];
  //       }
  //     })
  //     return Object.keys(achat).map((k:any)=>({"key":k,"value":achat[k]}));
  // }


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


  getIndividuallProviders(type:any){
    console.log(type.target.value);

    if(type.target.value == "All"){
      // this.getAllProviders()
    }else{

      this.providers = [];
      this.supplierService.getProviderByType(type.target.value).subscribe(data=>{
        this.providers = data;
      })
    }

  }

}
