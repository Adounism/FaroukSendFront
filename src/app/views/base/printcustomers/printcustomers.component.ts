import { Component } from '@angular/core';
import {ClientService} from '../../../services/client.service';
import {Users} from '../../../models/Users';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-navs',
  templateUrl: './printcustomers.component.html',
  styleUrls: ['./printcustomers.component.scss']
})
export class PrintcustomersComponent {
  customers: any[]=[];
  page: number = 1;
  total: number = 0;
  searchText= "";

  constructor(private clientService: ClientService, private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService, private router: ActivatedRoute) { 

  this.getAllClient();
  }

  getAllClient(){
    
    this.clientService.getAllClientPage(this.page).subscribe(async data=>{
      this.customers = data;
      this.total = data.length;
      console.log(this.total);
      
      this.customers.reverse();
      console.log(data);
      
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
                detail:"Encaissement supprimer",
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

    /**
   * Write code on Method
   *
   * @return response()
   */
     pageChangeEvent(event: number){
      this.page = event;
      this.getAllClient();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllClient();
  }
  onTableSizeChange(event: any): void {
    // this.tableSize = event.target.value;
    // this.page = 1;
    // this.fetchPosts();
  }

  onSearchChange(searchValue: string){  

    this.customers=[];
    let term = searchValue.trim();

    this.clientService.searchCustomers(searchValue).subscribe(data=>{
      console.log(data);
      this.customers = data;
      
    })
  }


}

