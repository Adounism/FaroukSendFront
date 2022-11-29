import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CardService } from 'src/app/services/card.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-printcardsale',
  templateUrl: './printcardsale.component.html',
  styleUrls: ['./printcardsale.component.scss']
})
export class PrintcardsaleComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  transactionType:any[]=[];
  sendType = "";
  searchText = ""
  visible = true;

  cardSellListes:any[]=[];
  listeCardTypes:any[]=[];
  userCardSell:any;
  cardForSales:any=[];
  page: number = 1;
  total: number = 0;
  constructor(private transaction: TransactionsService, 
    private toast: NgToastService,
    private cardService:CardService,
    private ngxComfirmService: NgxBootstrapConfirmService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,) { }

  ngOnInit(): void {
    this.getAllCardSells();
    this.getAllCardTypes();
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
        this.getClientCreditPurchase(card);
      })
    })
    
  }

  toggleCollapse(): void {
    this.visible = !this.visible;
  }


  getAllCardTypes(){
    this.cardService.getAllTypeOfCard().subscribe(data=>{
      this.listeCardTypes = data;
    })
  }

  deleteCardSale(id:number){
      this.ngxComfirmService.confirm({
        title:'Voulez vous effacer cette client?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }).then((res: boolean) => {
        if (res) {
          this.transaction.deleteCardSelle(id).subscribe({
            next: data=>{
              if(data.status == 200){
      
                this.toast.success({
                  detail:"carte supprimer",
                  summary:"",
                  duration: 3000
                 });
                 this.getAllCardSells();
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
          console.log('Cancel');
        }
      });
    }

    getClientCreditPurchase(client:any){
      client["cardToTypeCardRelation"].forEach((data:any, index:number)=>{ 
        
        this.userCardSell = data;
        // console.log(this.userCardSell);
        
  
      })
  
      
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
  
    searchTransactionByDateRange(from:any, to: any){
  
    }
  

    onsearch(event:any){
      this.searchText = event;
      this.cardForSales = [];
      this.transaction.getSearchCardSalling(this.searchText).subscribe(data=>{
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
          this.getClientCreditPurchase(card);
        });
        
     })
    }

    
onChange(cardType:any) {
  console.log(cardType.target.value);
  if(cardType.target.value){
    this.cardForSales = [];
    this.transaction.getSearchCardByCardType(cardType.target.value).subscribe(data=>{
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
        this.getClientCreditPurchase(card);
      });
    });

  }
}
}
