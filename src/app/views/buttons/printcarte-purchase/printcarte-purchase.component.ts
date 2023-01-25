import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CardService } from 'src/app/services/card.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-printcarte-purchase',
  templateUrl: './printcarte-purchase.component.html',
  styleUrls: ['./printcarte-purchase.component.scss']
})
export class PrintcartePurchaseComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  transactionType:any[]=[];
  sendType = "";
  searchText = ""
  visible = true;
  cartePurchaseListe:any[]=[];
  cardPurchase:any=[];
  cardForSales:any=[];
  userCardSell:any;
  listeCardTypes:any[]=[];
  page: number = 1;
  total: number = 0;
  constructor(private puchase: PurchasesService,
    private toast: NgToastService,
    private transaction: TransactionsService,
    private ngxComfirmService: NgxBootstrapConfirmService,
    private cardService:CardService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,) { }

  ngOnInit(): void {
    this.getAllPuchasedCard();
    this.getAllCardTypes();
  }

  toggleCollapse(): void {
    this.visible = !this.visible;
  }

  getAllCardTypes(){
    this.cardService.getAllTypeOfCard().subscribe(data=>{
      this.listeCardTypes = data;
    })
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


  onChange(cardType:any) {
    if(cardType.target.value != "Tous"){
      this.cardPurchase = [];
      this.puchase.getSearchCardPurchaseByCardType(cardType.target.value).subscribe(data=>{
        this.cardForSales = data;
        let allCards:any = [];
        data.forEach((d:any)=>{
          let obj:any = {}
          if(d['provider']['business']){
            obj['provider']=d['provider']?.['business']

          }else{
            obj['provider']=d['provider']['individual']?.['firstName']+" "+d['provider']['individual']?.['lastName']

          }
          console.log(obj['provider']);

          // obj['provider']=d['provider']
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

        data.forEach((card:any)=>{
          // this.getClientCreditPurchase(card);
        });
      });

    }else{
      this.getAllPuchasedCard();
    }
  }

  deleteCardPurchase(id:number){

      this.ngxComfirmService.confirm({
        title:'Voulez vous effacer cette client?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }).then((res: boolean) => {
        if (res) {
          this.puchase.deleteCardPurchase(id).subscribe({
            next: data=>{
              if(data.status == 200){

                this.toast.success({
                  detail:"carte supprimer",
                  summary:"",
                  duration: 3000
                 });
                 this.getAllPuchasedCard();
              }

            },
            error: error=>{
              if(error.status == 404){

                this.toast.warning({
                  detail:"La carte n'existe pas!!!",
                  summary:error.body.message,
                  duration: 3000
                 });
              }
            }
          });
        } else {

        }
      });
    }

    getSupplierCreditPurchase(client:any){
      client["cardToTypeCardRelation"].forEach((data:any, index:number)=>{

        this.userCardSell = data;
        // console.log(this.userCardSell);
      });
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

    searchTransactionByDateRange(from:any, to: any){

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
