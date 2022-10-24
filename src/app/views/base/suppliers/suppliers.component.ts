import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  
  profileForm!: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      adresse: ['', [Validators.nullValidator]],
      phone: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.nullValidator]],
      typeFournisseur:['', [Validators.required]]
    });
  }

  ajouter() {
    this.submitted = true;
    if(this.profileForm.valid){

      console.log("Forme valide succes");
      
    }
  }

}
