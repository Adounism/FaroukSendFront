import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-printcredit-purchase',
  templateUrl: './printcredit-purchase.component.html',
  styleUrls: ['./printcredit-purchase.component.scss']
})
export class PrintcreditPurchaseComponent implements OnInit {
  creditPurchaseListe:any[]=[];
  typePurchase="purchaseOfCredits";
  userCardSell:any;

  constructor(private purchaseService:PurchasesService,
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService) { }

  ngOnInit(): void {
    this.getAllCreditPurchase();
  }


  getAllCreditPurchase(){
    this.purchaseService.getAllPurchase(this.typePurchase).subscribe(data=>{
      this.creditPurchaseListe = data;
      // console.log(this.creditPurchaseListe);


    })
  }



  delete(id:number){
    this.ngxComfirmService.confirm({
      title:'Voulez-vous effacer achat de credit?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.purchaseService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Transaction supprimer",
                summary:"",
                duration: 3000
               });
               this.getAllCreditPurchase();
            }
            
          },
          error: error=>{

              this.toast.warning({
                detail:"La Transaction n'existe pas!!!",
                summary:error.body.message,
                duration: 3000
               });
          
          }
        });
      } else {
        console.log('Cancel');
      }
    });

  }



}
