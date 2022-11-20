import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { catchError } from 'rxjs';
import { TransactionsService } from 'src/app/services/transactions.service';


@Component({
  selector: 'app-printmobiletransaction',
  templateUrl: './printmobiletransaction.component.html',
  styleUrls: ['./printmobiletransaction.component.scss']
})
export class PrintmobiletransactionComponent implements OnInit {

  mobileTransactions:any[]=[];
  constructor(private mobileTransaction: TransactionsService,
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService, ) { }

  ngOnInit(): void {
    this.getAllMobiletransaction();
  }


  getAllMobiletransaction(){
    this.mobileTransaction.getAllMobileSend().subscribe(data=>{
       this.mobileTransactions = data;
       console.log(this.mobileTransactions);
       
    })
  }

  deletetransaction(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez-vous effacer cette Transaction?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.mobileTransaction.deletemobileTransfert(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Encaissement supprimer",
                summary:"",
                duration: 3000
               });
               this.getAllMobiletransaction();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"La Transaction n'existe pas!!!",
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
