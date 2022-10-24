import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  profileForm!: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      adresse: ['', [Validators.nullValidator]],

      contact: ['', [Validators.required, Validators.minLength(4)]],

      email: ['', [Validators.nullValidator]],

      typeClient:['', [Validators.required]]
    });
  }

  get registerFormControl() {
    //console.log(this.profileForm.controls);
    
    return this.profileForm.controls;
  }

  ajouter() {

    this.submitted = true;
    if(this.profileForm.valid){

      console.log("Forme valide succes");
      
    }
  }
}
