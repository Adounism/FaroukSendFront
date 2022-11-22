import { Component, OnInit } from '@angular/core';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-printmobile-trans-purchase',
  templateUrl: './printmobile-trans-purchase.component.html',
  styleUrls: ['./printmobile-trans-purchase.component.scss']
})
export class PrintmobileTransPurchaseComponent implements OnInit {

  mobileTransfertListe:any[]=[];
  typePurchase = "mobileTransferPurchase";
  constructor(private purshaseService: PurchasesService) { }

  ngOnInit(): void {
    this.getAllMobileTransfertPurchase();
  }

  getAllMobileTransfertPurchase(){
    this.purshaseService.getAllPurchase(this.typePurchase).subscribe(data=>{
      this.mobileTransfertListe = data;
      console.log(this.mobileTransfertListe);
      
    });

  }

  delete(id:number){

  }

}
