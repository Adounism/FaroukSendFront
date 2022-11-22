import { Component, OnInit } from '@angular/core';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-printcredit-purchase',
  templateUrl: './printcredit-purchase.component.html',
  styleUrls: ['./printcredit-purchase.component.scss']
})
export class PrintcreditPurchaseComponent implements OnInit {
  creditPurchaseListe:any[]=[];
  typePurchase="purchaseOfCredits";

  constructor(private purchaseService:PurchasesService) { }

  ngOnInit(): void {
    this.getAllCreditPurchase();
  }


  getAllCreditPurchase(){
    this.purchaseService.getAllPurchase(this.typePurchase).subscribe(data=>{
      this.creditPurchaseListe = data;
      console.log(this.creditPurchaseListe);
      
    })
  }

  delete(id:number){
    
  }

}
