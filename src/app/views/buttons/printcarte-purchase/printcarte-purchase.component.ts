import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-printcarte-purchase',
  templateUrl: './printcarte-purchase.component.html',
  styleUrls: ['./printcarte-purchase.component.scss']
})
export class PrintcartePurchaseComponent implements OnInit {

  cartePurchaseListe:any[]=[];
  cardPurchase:any=[];

  userCardSell:any;
  page: number = 1;
  total: number = 0;
  constructor(private puchase: PurchasesService, 
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService) { }

  ngOnInit(): void {
    this.getAllPuchasedCard();
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
        }else{
          allCards.push(obj)
        }
      })
      this.cardPurchase = allCards;
      
      // data.forEach((card:any)=>{
      //   this.getSupplierCreditPurchase(card);
        
      // })

      
    })
    
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
        
  
      })
  
      
    }

}
