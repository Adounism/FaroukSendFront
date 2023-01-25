import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CardService } from 'src/app/services/card.service';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-floating-labels',
  templateUrl: './floating-labels.component.html',
  styleUrls: ['./floating-labels.component.scss']
})
export class FloatingLabelsComponent implements OnInit{

  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  transactionType:any[]=[];
  sendType = "";
  searchText = ""
  visible = true;
  cartePurchaseListe:any[]=[];
  cardPurchase:any=[];
  listeCardTypes:any[]=[];
  userCardSell:any;
  page: number = 1;
  total: number = 0;
  cardForSales:any=[];
  constructor(private puchase: PurchasesService,
    private toast: NgToastService,
    private cardService:CardService,
    private ngxComfirmService: NgxBootstrapConfirmService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,) { }


  ngOnInit(): void {
    this.getAllPuchasedCard();
    this.getAllCardTypes();
  }


  toggleCollapse(): void {
    this.visible = !this.visible;
  }



  getAllPuchasedCard(){
    this.puchase.getAllCardPurchase().subscribe(data=>{
      this.cartePurchaseListe = data;
      let allCards:any = [];
      data.forEach((d:any)=>{
        let obj:any = {}
        obj['provider']=d['provider']
        if(obj['provider']['business']){
          obj['provider']=d['provider']['business']['name'];
        }else if(obj['provider']=d['provider']['individual']) {
          obj['provider']=d['provider']['individual']['firstName']+" "+d['provider']['individual']['lastName']

        }else{
          console.log("Hello");

        }
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
      this.cardPurchase = allCards;
      console.log(allCards);




      // data.forEach((card:any)=>{
      //   this.getSupplierCreditPurchase(card);

      // })


    })

  }

  getAllCardTypes(){
    this.cardService.getAllTypeOfCard().subscribe(data=>{
      this.listeCardTypes = data;
    })
  }

  onChange(cardType:any) {
    console.log(cardType.target.value);
    if(cardType.target.value){
      this.cardForSales = [];
      this.puchase.getSearchCardPurchaseByCardType(cardType.target.value).subscribe(data=>{
        this.cardForSales = data;
        console.log(data);

        let allCards:any = [];
        data.forEach((d:any)=>{
          let obj:any = {}
          if(d['provider']['business']){
            obj['provider']=d['provider']['business']
          }else{

            obj['provider']=d['provider']['firstName']+" "+d['provider']['lastName']
          }

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

    }
  }



  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.cartePurchaseListe = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.puchase.findByRangeDateCreditCardPurchase(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.cartePurchaseListe = data;
      })

    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.cartePurchaseListe = [];
      this.puchase.findByRangeDateCreditCardPurchase(fromdateFormate, todateFormate).subscribe(data=>{
        this.cartePurchaseListe = data;
      })
    }
    else {
      this.toDate = null;
      this.fromDate = date;

      this.cartePurchaseListe = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.puchase.findByRangeDateCreditCardPurchase(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.cartePurchaseListe = data;
      })

    }
  }

  isEmpty(fromDate: any, toDate:any){
    if(!fromDate || !toDate){
      this.getAllPuchasedCard();
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

  onsearch(event:any){
    this.searchText = event;
    this.cartePurchaseListe = [];
    this.puchase.getSearchCreditCardPurchase(this.searchText).subscribe(data=>{
      this.cartePurchaseListe = data;
      let allCards:any = [];
      data.forEach((d:any)=>{
        let obj:any = {}
        obj['provider']=d['provider']
        if(obj['provider']['business']){
          obj['provider']=d['provider']['business']['name'];
        }else{
          obj['provider']=d['provider']['individual']['firstName']+" "+d['provider']['individual']['lastName']

        }
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
      this.cardPurchase = allCards;

   })
  }


}
