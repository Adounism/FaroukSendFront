import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  customerForm?: FormGroup;

  profileForm = new FormGroup({
    firstname: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),
    lastname: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),
    adresse: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),

    contact: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),

    
    email: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),

    
    typeClient: new FormControl([
      Validators.required,
      Validators.minLength(4),
    ]),

  });

  constructor(
  ) { }



  ajouter(){

    console.log(this.profileForm.value);
    

  }
}
