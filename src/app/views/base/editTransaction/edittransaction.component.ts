import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './edittransaction.component.html',
  styleUrls: ['./edittransaction.component.scss']
})
export class EditTransactionComponent {
  transactionForm!: FormGroup;
  clientListe: any[]=[];
  listeOperations: any[]=[];
  transactionData:any;
  transactionId!:number;

  constructor(private route: ActivatedRoute, private transService: TransactionsService,
    private toast: NgToastService,private router: Router) { 

    this.transactionId = this.route.snapshot.params['id'];
    this.getTransactionById(this.transactionId);

  }

  getTransactionById(id:number){
    this.transService.find(id).subscribe(data=>{
      this.transactionData = data;
    },error=>{
      if(error.status == 404){
        this.router.navigate(['/404']);
      }
      
    });
  }

  ajouter(){

  }

}
