import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-list-groups',
  templateUrl: './editoperation.component.html',
  styleUrls: ['./editoperation.component.scss']
})
export class EditOperationComponent implements OnInit{

  operationForm!: FormGroup;
  currentOperation: any;
  operationId!: number;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private toast: NgToastService,private router: Router,
    private operationService: OperationsService ) { 

    }
  ngOnInit(): void {
    this.operationId = this.route.snapshot.params['id'];

    this.getOperation(this.operationId);
    this.operationForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.nullValidator]],

    });
  }

  getOperation(id:number){

    this.operationService.find(id).subscribe(data=>{
      this.currentOperation = data;
    }, 
    error=>{
      if(error.status == 404){
        this.router.navigate(['/404']);
      }
      
    }
    )
  }

  updateOperation(){
    this.operationService.update(this.operationId, this.currentOperation).subscribe(
      response=>{
        console.log(response);
        
       this.toast.success({
        detail:"Operation update success",
        summary:"",
        duration: 3000
       });
        
    }, error =>{
      console.log(error);
      
    })

  }

}
