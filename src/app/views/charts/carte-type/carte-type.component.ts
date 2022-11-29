import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-carte-type',
  templateUrl: './carte-type.component.html',
  styleUrls: ['./carte-type.component.scss']
})
export class CarteTypeComponent implements OnInit {
  listCarteTypes:any[]=[];
  constructor(private cardService: CardService,
    private ngxComfirmService: NgxBootstrapConfirmService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllCardTypes();
  }


  getAllCardTypes(){
    this.cardService.getAllTypeOfCard().subscribe(data=>{
      this.listCarteTypes = data;
    })
  }

  deleteCarte(id:number){
    this.ngxComfirmService.confirm({
      title:'Voulez-vous supprimer cette carte?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.cardService.deleteCard(id).subscribe({
          next: data=>{

            if(data.status == 204){
    
              this.toast.success({
                detail:"Carte de crédit supprimer",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllCardTypes();
            }
            
          },
          error: error=>{
            this.toast.warning({
            detail:"Carte inexistant!!!",
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
