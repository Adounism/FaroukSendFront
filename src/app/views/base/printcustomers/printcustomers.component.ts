import { Component } from '@angular/core';
import {ClientService} from '../../../services/client.service';
import {Users} from '../../../models/Users';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';

@Component({
  selector: 'app-navs',
  templateUrl: './printcustomers.component.html',
  styleUrls: ['./printcustomers.component.scss']
})
export class PrintcustomersComponent {
  customers: any[]=[];

  constructor(private clientService: ClientService, private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService) { 

  this.getAllClient();
  }

  getAllClient(){
    
    this.clientService.getAllClient().subscribe(async data=>{
      this.customers = data['hydra:member'];
      JSON.stringify(this.customers); 
      console.log(data['hydra:member']);
      
    },
    async error => {
      console.log(error.message);
    });
    
  }

  deleteCustomer(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez vous effacer cette client?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.clientService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Customer deleted",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllClient();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"Le client n'existe pas!!!",
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

