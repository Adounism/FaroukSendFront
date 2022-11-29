import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-addcarte-type',
  templateUrl: './addcarte-type.component.html',
  styleUrls: ['./addcarte-type.component.scss']
})
export class AddcarteTypeComponent implements OnInit {

  carteForm!: FormGroup;

  constructor(private fb: FormBuilder, private cardService: CardService, 
    private toast: NgToastService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.carteForm = this.fb.group({
      name: ['', [Validators.required]],
      description:['', [Validators.nullValidator]],
    });

  }

  ajouter(){
    console.log(this.carteForm.value);

    if(this.carteForm.valid){
      this.cardService.createCard(this.carteForm.value).then((res)=>{
        console.log(res);
        this.toast.success({
          detail:"Carte de crédit ajouter",
          summary:"",
          duration: 3000
         });
         this.router.navigate(['/vente-carte/cartetype']);
      }).catch(error=>{
        this.toast.warning({
          detail:error.body.message,
          summary:"",
          duration: 3000
         });
      })
    }

    
  }

  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }

}