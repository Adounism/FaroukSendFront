import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-carousels',
  templateUrl: './sendcredit.component.html',
  styleUrls: ['./sendcredit.component.scss']
})
export class SendcreditComponent {

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
