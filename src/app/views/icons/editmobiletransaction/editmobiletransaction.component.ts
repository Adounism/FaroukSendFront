import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-editmobiletransaction',
  templateUrl: './editmobiletransaction.component.html',
  styleUrls: ['./editmobiletransaction.component.scss']
})
export class EditmobiletransactionComponent implements OnInit {

  transactionForm!: FormGroup;
  profileForm!: FormGroup;
  clientListe: any[]=[];
  transactionData:any;
  onLoading = false;
  transactionId!:number;
  currentTransaction:any;



 
  submitted = false;
  selected!: number;
  message:any;

  constructor(private transaction: TransactionsService,
    private router:Router, private route:ActivatedRoute,
    private toast: NgToastService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private modalService: MdbModalService,) { 
    this.transactionId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTransactionById(this.transactionId);
    this.getClientList();

    // this.transactionForm =  this.fb.group({
    //   date: ['', [Validators.nullValidator]],
    //   // numeroPdv: ['', [Validators.nullValidator]],
    //   sendType:['send', [Validators.nullValidator]],
    //   amount:['', [Validators.required]],


    // });
  }

  getTransactionById(id:number){
    this.transaction.findmobileTransfert(id).subscribe(data=>{
      this.currentTransaction = data;
    },error=>{
      if(error.status == 404){
        this.router.navigate(['/404']);
      }
    });
  }

  getClientList(){
    this.clientService.getAllClient().subscribe(data=>{
      this.clientListe = data;
    });
  }


  ajouter(form:NgForm){
    this.transactionData = form.value;

    if(this.transactionData.amount != "" && this.transactionData.amount > 0){
      this.onLoading = true;
      let pipe = new DatePipe('en-US'); 
      const myFormattedDate = pipe.transform(this.transactionData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      let data = {
        "amount": this.transactionData.amount,
        "client": '/api/clients/'+this.transactionData.client["id"] ,
        "date":  myFormattedDate,
        "sendType":"send"
      }
      this.transaction.editmobileTransfert(this.transactionId, data).subscribe(datat=>{
        console.log(data);
        this.toast.success({
          detail:"Transaction  update success",
          summary:"",
          duration: 3000
         });
         this.router.navigate(['/icons/printmobiletransaction']);
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

  openModal(content:any){
    this.modalService.open(content);
  }


  get registerFormControl() {
    return this.profileForm.controls;
  }


  ajouterclient() {


  
    if(this.profileForm.valid){
      this.submitted = true;
      let first = document.querySelector('.box') as HTMLElement | null;
      this.clientService.create(this.profileForm.value).then((res)=>{

        this.toast.success({
          detail:"Client ajouter",
          summary:"Client ajouter avec succes",
          duration: 3000
         });
         
         this.submitted = false;
         if (first != null) {
          first.style.display = "none";
        }
      }).catch(error=>{
        console.log(error);
        
        this.submitted = false;

      });
    }


  }



}
