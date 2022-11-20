import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgToastService } from 'ng-angular-popup';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-editencaissement',
  templateUrl: './editencaissement.component.html',
  styleUrls: ['./editencaissement.component.scss']
})
export class EditencaissementComponent implements OnInit {
  encaissementId!:number;
  currentEncaissement:any;
  onLoading= false;

  constructor(private transaction: TransactionsService,
    private router:Router, private route:ActivatedRoute,
    private toast: NgToastService,
    private fb: FormBuilder,
    private modalService: MdbModalService) { 
      this.encaissementId = this.route.snapshot.params['id'];
    }

  ngOnInit(): void {
    this.getEncaissement(this.encaissementId);
  }

  getEncaissement(id:number){
    this.transaction.findencaissement(id).subscribe(data=>{
      this.currentEncaissement = data;
    });
  }

  ajouter(form:NgForm){

  }
}
