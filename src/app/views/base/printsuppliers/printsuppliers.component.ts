import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import {SupplierService} from '../../../services/supplier.service';

@Component({
  selector: 'app-navs',
  templateUrl: './printsuppliers.component.html',
  styleUrls: ['./printsuppliers.component.scss']
})
export class PrintsupplierComponent implements OnInit{

  providers: any[]=[];

  constructor(private supplierService: SupplierService,
    private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService ) { }
  ngOnInit(): void {
    this.getAllProviders();
  }

  getAllProviders(){
    
    this.supplierService.getAllProviders().subscribe(async data=>{
      this.providers = data;
      JSON.stringify(this.providers); 
      
    },
    async error => {
      console.log(error.message);
    });
    
  }

  deletesupplier(id: number){
    this.ngxComfirmService.confirm({
      title:'Voulez vous effacer cette Fournisseur?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.supplierService.delete(id).subscribe({
          next: data=>{
            this.toast.success({
              detail:"Founisser supprimer",
              summary:data.body.message,
              duration: 3000
              });

            this.getAllProviders();
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"Founisseur inexistant !!!",
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

