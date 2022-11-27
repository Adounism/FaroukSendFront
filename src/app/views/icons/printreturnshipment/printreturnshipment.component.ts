import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-printreturnshipment',
  templateUrl: './printreturnshipment.component.html',
  styleUrls: ['./printreturnshipment.component.scss']
})
export class PrintreturnshipmentComponent implements OnInit {
  returnShipmentListe:any[]=[];
  sendType= "sendBack";
  searchTerm="";

  constructor(private transaction: TransactionsService,
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService) { }

  ngOnInit(): void {
    this.getAllReturnShippment();

  }

  getAllReturnShippment(){
    this.transaction.getAllMobileSend(this.sendType, this.searchTerm).subscribe(data=>{
      this.returnShipmentListe = data;
      console.log(this.returnShipmentListe);
      
    });
  }

  deletetreturnShippment(id:number){
    
    this.ngxComfirmService.confirm({
      title:'Voulez-vous effacer cette Transaction?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.transaction.deletemobileTransfert(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Transaction supprimer",
                summary:"",
                duration: 3000
               });
               this.getAllReturnShippment();
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
