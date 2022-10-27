import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {OperationsService} from '../../../services/operations.service';
@Component({
  selector: 'app-carousels',
  templateUrl: './addoperation.component.html',
  styleUrls: ['./addoperation.component.scss']
})
export class AddOperationComponent implements OnInit{

  creditForm!: FormGroup;

  constructor(private fb: FormBuilder, private operationService: OperationsService) {
    
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
        
      }
      )
    }

    
  }

  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }

}
