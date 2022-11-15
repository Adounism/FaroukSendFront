import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { OperationsService } from 'src/app/services/operations.service';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
@Component({
  selector: 'app-tooltips',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent {
  listOperation:any[]=[];
  constructor(private operationService: OperationsService, private toast: NgToastService,
    private ngxComfirmService: NgxBootstrapConfirmService) { 
    this.getAllOperation();

  }

  getAllOperation(){
    this.operationService.getAllOperations().subscribe(response=>{
      this.listOperation = response;
    })
  }

  deleteOperation(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez vous effacer cette client?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.operationService.delete(id).subscribe({
          next: data=>{
    
            if(data.status == 200){
    
              this.toast.success({
                detail:"Operation deleted",
                summary:data.body.message,
                duration: 3000
               });
               this.getAllOperation();
            }
            
          },error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"operation inexistant!!!",
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
