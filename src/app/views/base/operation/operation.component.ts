import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-tooltips',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent {
  listOperation:any[]=[];
  constructor(private operationService: OperationsService, private toast: NgToastService) { 
    this.getAllOperation();

  }

  getAllOperation(){
    this.operationService.getAllOperations().subscribe(response=>{
      this.listOperation = response['hydra:member'];
    })
  }

  deleteOperation(id:number){
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
    })
  }


}
