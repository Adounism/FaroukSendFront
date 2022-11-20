import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-paginations',
  templateUrl: './encaissement.component.html',
  styleUrls: ['./encaissement.component.scss']
})
export class PaginationsComponent implements OnInit{
  encaissementListe:any[]=[];
  page: number = 1;
  total: number = 0;
  searchText= "";

  constructor(private transactionService: TransactionsService,
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService,) { }


  ngOnInit(): void {
    this.getAllencaissements();
  }

  getAllencaissements(){
    this.transactionService.getAllTresorie().subscribe(data=>{
      this.encaissementListe = data;
      console.log(this.encaissementListe);
      
    })
  }

  deleteEncaissement(id:number){
    this.ngxComfirmService.confirm({
      title:'Voulez vous supprimer cette encaissement?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.transactionService.deleteTresorieOpe(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Décaissement supprimer",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllencaissements();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"Cette encaissement est introuvable!!!",
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
