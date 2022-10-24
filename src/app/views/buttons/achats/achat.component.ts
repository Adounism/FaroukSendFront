import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-buttons',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.scss']
})
export class AchatComponent {


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

    credit: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),

    uv: new FormControl([
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
