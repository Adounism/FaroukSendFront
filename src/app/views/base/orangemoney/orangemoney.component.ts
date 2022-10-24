import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collapses',
  templateUrl: './orangemoney.component.html',
  styleUrls: ['./orangemoney.component.scss']
})
export class OrangemoneyComponent {

  creditForm?: FormGroup;


  sendcreditForm = new FormGroup({

    montant: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),

    client: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),

  });

  constructor() {
    

  }

  ajouter(){
    console.log(this.sendcreditForm.value);
    
  }

  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }

}
