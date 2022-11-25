import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgToastService } from 'ng-angular-popup';
import { TransactionsService } from 'src/app/services/transactions.service';
@Component({
  selector: 'app-editdecaissement',
  templateUrl: './editdecaissement.component.html',
  styleUrls: ['./editdecaissement.component.scss']
})
export class EditdecaissementComponent implements OnInit {
  encaissementId!:number;
  currentDecaissement:any;
  encaissementData:any;
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
      this.currentDecaissement = data;
      console.log(this.currentDecaissement);
      

    });
  }

  update(form:NgForm){
    console.log(form);

    this.encaissementData = form.value;
    if(this.encaissementData.amount != "" && this.encaissementData.amount > 0){
      this.onLoading = true;
      let pipe = new DatePipe('en-US'); 
      const myFormattedDate = pipe.transform(this.encaissementData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      let data = {
        "amount": this.encaissementData.amount,
        "date":myFormattedDate,
        "numberReceived": this.encaissementData.numberReceived,
        "description":this.encaissementData.description,
      }
      this.transaction.editTresorieOpe(this.encaissementId, data).subscribe(data=>{
        console.log(data);
        this.toast.success({
          detail:"Encaissement  update success",
          summary:"",
          duration: 3000
         });
         this.router.navigate(['/icons/encaissement']);
        },error=>{
          this.onLoading = false;
          this.toast.error({
            detail:"Traitment error please try again",
            summary:"",
            duration: 3000
           });
        })
    }else{
      this.onLoading = false;
      this.toast.warning({
        detail:"field amount error",
        summary:"please provide a positive number!!",
        duration: 3000
       });
    }
    
    
  }
}
