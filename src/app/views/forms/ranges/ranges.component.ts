import { Component } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from 'src/app/services/card.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TransactionsService } from 'src/app/services/transactions.service';


@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.scss']
})
export class RangesComponent {

  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  visible = true;

  supplierData:any[]=[];
  searchText ='';
  total:number=0;
  nombreAchat= 0;


  cardSellListes:any[]=[];
  listeCardTypes:any[]=[];
  cardForSales:any=[];
  page: number = 1;

  constructor(private supplierService: SupplierService,
    private transaction: TransactionsService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private cardService:CardService,) { }

  ngOnInit(): void {
    // this.getAllSupplier();
    this.getAllCardSells();
    this.getAllCardTypes();

  }




  toggleCollapse(): void {
    this.visible = !this.visible;
  }

  onChange(cardType:any) {
    console.log(cardType.target.value);
    if(cardType.target.value != "Tous"){
      this.cardForSales = [];
      this.transaction.getSearchCardPurchaseByCardType(cardType.target.value).subscribe(data=>{
        this.cardForSales = data;
        let allCards:any = [];
        data.forEach((d:any)=>{
          let obj:any = {}
          obj['client']=d['client']['firstName']+" "+d['client']['lastName']
          obj['pdvNumber']=d['client']['pdvNumber']
          obj['date']=d['date']
          if (d['cardToTypeCardRelation'].length > 0) {
            d['cardToTypeCardRelation'].forEach((card:any)=>{
              let copy = {...obj}
              copy['typeCardForSale']=card['typeCardForSale']['name']
              copy['quantity']=card['quantity']
              copy['unitPrice']=card['unitPrice']
              copy['amountHT']=card['amountHT']
              copy['id']=card['id']
              allCards.push(copy)
            })
          }
        })
        this.cardForSales = allCards;
        data.forEach((card:any)=>{
          // this.getClientCreditPurchase(card);
        });
      });

    }else{
      this.getAllCardSells();
    }
  }

  getAllCardTypes(){
    this.cardService.getAllTypeOfCard().subscribe(data=>{
      this.listeCardTypes = data;
    })
  }


  getAllCardSells(){
    this.transaction.getAllCardSales(this.page).subscribe(data=>{
      this.cardSellListes = data;

      let allCards:any = [];
      data.forEach((d:any)=>{
        let obj:any = {}
        obj['client']=d['client']['firstName']+" "+d['client']['lastName']
        obj['pdvNumber']=d['client']['pdvNumber']
        obj['date']=d['date']
        if (d['cardToTypeCardRelation'].length > 0) {
          d['cardToTypeCardRelation'].forEach((card:any)=>{
            let copy = {...obj}
            copy['typeCardForSale']=card['typeCardForSale']['name']
            copy['quantity']=card['quantity']
            copy['unitPrice']=card['unitPrice']
            copy['amountHT']=card['amountHT']
            copy['id']=card['id']
            allCards.push(copy)
          })
        }
      })
      this.cardForSales = allCards;
      data.forEach((card:any)=>{
        // this.getClientCreditPurchase(card);
      })
    })

  }

  getAllSupplier(){
    this.supplierService.getAllProviders().subscribe(data=>{
      this.supplierData = data;
      let sum:number=0;
      data.forEach((element:any) => {
        sum+= this.getProviderTotalPurchase(element);
      });
      this.total = sum;
    })
  }

  getProviderTotalPurchase(provider:any){
    let total = 0
    provider['purchases'].forEach((p:any, index:number)=>{
      console.log(index);

      total+=p['amount']
      this.nombreAchat++;
    })
    return total;
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.cardForSales = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.transaction.findByRangeDateMobileTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.cardForSales = data;
      })

    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.cardForSales = [];
      this.transaction.findByRangeDateMobileTransfert(fromdateFormate, todateFormate).subscribe(data=>{
        this.cardForSales = data;
      })
    }
    else {
      this.toDate = null;
      this.fromDate = date;

      this.cardForSales = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.transaction.findByRangeDateMobileTransfert(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.cardForSales = data;
      })

    }
  }

  isEmpty(fromDate: any, toDate:any){
    if(!fromDate || !toDate){
      this.getAllCardSells();
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

      /**
   * Write code on Method
   *
   * @return response()
   */
      pageChangeEvent(event: number){
        this.page = event;
        this.getAllCardSells();
    }

    onTableDataChange(event: any) {
      this.page = event;
      this.getAllCardSells();
    }

}
