import { Component, OnInit } from '@angular/core';
import {PurchasesService} from '../../../services/purchases.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
@Component({
  selector: 'app-popovers',
  templateUrl: './printachat.component.html',
  styleUrls: ['./printachat.component.scss']
})
export class PrintAchatComponent implements OnInit {

  listePurchases: any[]=[];
  // visible = true;

  constructor(private purchaseService: PurchasesService, private  ngxComfirmService: NgxBootstrapConfirmService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllPurchase();
  }

  getAllPurchase(){
    this.purchaseService.getAllPurchase().subscribe(data=>{
      this.listePurchases = data;
      console.log(this.listePurchases);
      
    })
  }

  deletePurchase(id:number){
    this.ngxComfirmService.confirm({
      title:'Voulez vous effacer cette achat?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.purchaseService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Purchase deleted",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllPurchase();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"L'achat est inexistant !!!",
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

}
