import { Component, OnInit } from '@angular/core';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-printcarte-purchase',
  templateUrl: './printcarte-purchase.component.html',
  styleUrls: ['./printcarte-purchase.component.scss']
})
export class PrintcartePurchaseComponent implements OnInit {

  cartePurchaseListe:any[]=[];
  typePurchase="purchasingCards";

  constructor(private purchaseService:PurchasesService) { }

  ngOnInit(): void {
    this.getAllCartePurchase();
  }


  getAllCartePurchase(){
    this.purchaseService.getAllPurchase(this.typePurchase).subscribe(data=>{
      this.cartePurchaseListe = data;
    })
  }

}
