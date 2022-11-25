import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-decaissement',
  templateUrl: './decaissement.component.html',
  styleUrls: ['./decaissement.component.scss']
})
export class DecaissementComponent implements OnInit {

  decaissementListe:any[]=[];
  page: number = 1;
  total: number = 0;
  searchText= "";
  collectyonType = "disbursement";

  constructor(private transactionService: TransactionsService,
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService,) { }


  ngOnInit(): void {
    this.getAllencaissements();
  }

  getAllencaissements(){
    this.transactionService.getAllTresorie(this.collectyonType).subscribe(data=>{
      this.decaissementListe = data;
      console.log(this.decaissementListe);
      
    })
  }

  deletedecaissement(id:number){
    this.ngxComfirmService.confirm({
      title:'Voulez-vous supprimer cette décaissement?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.transactionService.deleteTresorieOpe(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"décaissement supprimer",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllencaissements();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"Cette décaissement est introuvable!!!",
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
