import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-editcarte-type',
  templateUrl: './editcarte-type.component.html',
  styleUrls: ['./editcarte-type.component.scss']
})
export class EditcarteTypeComponent implements OnInit {
  cardtypeForm!: FormGroup;
  currentCard: any;
  cardId!: number;
  submitted = false;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private toast: NgToastService,private router: Router,
    private cardService: CardService ) { 

    }
  ngOnInit(): void {
    this.cardId = this.route.snapshot.params['id'];

    this.getcard(this.cardId);
    this.cardtypeForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.nullValidator]],

    });
  }

  getcard(id:number){

    this.cardService.findTypecard(id).subscribe(data=>{
      this.currentCard = data;
    }, 
    error=>{
      if(error.status == 404){
        this.router.navigate(['/404']);
      }
      
    }
    )
  }

  updateOperation(){
    if(this.cardtypeForm.valid){
      this.submitted = true;

      this.cardService.update(this.cardId, this.currentCard).subscribe(
        response=>{
          console.log(response);
          
         this.toast.success({
          detail:"Carte de crédit modifier",
          summary:"",
          duration: 3000
         });
         this.router.navigate(['/vente-carte/cartetype']);
      }, error =>{
        console.log(error);
        
      })
    }

  }

}
