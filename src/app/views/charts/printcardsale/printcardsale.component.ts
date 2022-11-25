import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-printcardsale',
  templateUrl: './printcardsale.component.html',
  styleUrls: ['./printcardsale.component.scss']
})
export class PrintcardsaleComponent implements OnInit {
  cardSellListes:any[]=[];
  userCardSell:any;
  cardForSales:any=[];
  page: number = 1;
  total: number = 0;
  constructor(private transaction: TransactionsService, 
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService) { }

  ngOnInit(): void {
    this.getAllCardSells();
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
        }else{
          allCards.push(obj)
        }
      })
      this.cardForSales = allCards;
      data.forEach((card:any)=>{
        this.getClientCreditPurchase(card);
      })
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

}
