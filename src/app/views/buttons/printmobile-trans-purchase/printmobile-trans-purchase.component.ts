import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-printmobile-trans-purchase',
  templateUrl: './printmobile-trans-purchase.component.html',
  styleUrls: ['./printmobile-trans-purchase.component.scss']
})
export class PrintmobileTransPurchaseComponent implements OnInit {

  mobileTransfertListe:any[]=[];
  searchdate!: NgbDate | null;
  typePurchase = "mobileTransferPurchase";
  constructor(private purshaseService: PurchasesService,
    private ngxComfirmService: NgxBootstrapConfirmService,
    private toast: NgToastService,) { }

  ngOnInit(): void {
    this.isEmpty(this.searchdate);
    // this.getAllMobileTransfertPurchase();
  }

  getAllMobileTransfertPurchase(){
    this.purshaseService.getAllPurchase(this.typePurchase).subscribe(data=>{
      this.mobileTransfertListe = data;
    });

  }

  delete(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez vous effacer cette Transaction?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.purshaseService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Transfert Mobile supprimer",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllMobileTransfertPurchase();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"Transfert Mobile inexistant!!!",
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

  onDateSelection(date: NgbDate){
    if(date){

      let fromdateFormate = date.year+'-'+date.month+'-'+date.day;

      
    }
  }

  
  isEmpty(searchDate: any){
    if(!searchDate){
      this.getAllMobileTransfertPurchase();
    }
  }

}
