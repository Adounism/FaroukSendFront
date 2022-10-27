import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import {OperationsService} from '../../../services/operations.service';
@Component({
  selector: 'app-carousels',
  templateUrl: './addoperation.component.html',
  styleUrls: ['./addoperation.component.scss']
})
export class AddOperationComponent implements OnInit{

  creditForm!: FormGroup;

  constructor(private fb: FormBuilder, private operationService: OperationsService, 
    private toast: NgToastService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.creditForm = this.fb.group({
      name: ['', [Validators.required]],
      description:['', [Validators.nullValidator]],
    });

  }

  ajouter(){
    console.log(this.creditForm.value);

    if(this.creditForm.valid){
      this.operationService.createOperation(this.creditForm.value).then((res)=>{
        console.log(res);
        this.toast.success({
          detail:"Operation add success",
          summary:"",
          duration: 3000
         });
         this.router.navigate(['/base/operation']);
      }
      )
    }

    
  }

  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }

}
