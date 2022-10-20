import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  
  ngOnInit(): void {
  
  }
  constructor() {}


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

  });



  ajouter(){

    console.log(this.profileForm.value);
    

  }



}
