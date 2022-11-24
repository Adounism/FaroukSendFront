import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-editreturnshipment',
  templateUrl: './editreturnshipment.component.html',
  styleUrls: ['./editreturnshipment.component.scss']
})
export class EditreturnshipmentComponent implements OnInit {

  transactionForm!: FormGroup;
  profileForm!: FormGroup;
  clientListe: any[]=[];
  transactionData:any;
  onLoading = false;
  currentReturnSipment:any;
  returnShipmentId!:number;
  returnShipmentData:any;


 
  submitted = false;
  selected!: number;
  message:any;
  constructor(private clientService: ClientService,
    private transService: TransactionsService,
     private toast: NgToastService,
     private router:Router,
     private fb: FormBuilder,
     private modalService: MdbModalService,
     private route:ActivatedRoute) {
      this.returnShipmentId = this.route.snapshot.params['id'];
      }

  ngOnInit(): void {
    this.getClientList();
    this.getCurrentReturnShipment(this.returnShipmentId);
  }

  getCurrentReturnShipment(id:number){
    this.transService.findmobileTransfert(id).subscribe(data=>{
      this.currentReturnSipment = data;
    })
  }

  getClientList(){
    this.clientService.getAllClient().subscribe(data=>{
      this.clientListe = data;

      
    })
  }
  update(form:NgForm){
    this.returnShipmentData = form.value;
    if(this.returnShipmentData.amount != "" && this.returnShipmentData.amount > 0){
      this.onLoading = true;
      let pipe = new DatePipe('en-US');
      console.log(this.returnShipmentData);
       
      const myFormattedDate = pipe.transform(this.returnShipmentData.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      let data = {
        "amount": this.returnShipmentData.amount,
        "date":myFormattedDate,
        "client": '/api/clients/'+this.returnShipmentData.client.id,
        "sendType": "sendBack"
      }
      this.transService.editmobileTransfert(this.returnShipmentId, data).subscribe(data=>{
        console.log(data);
        this.toast.success({
          detail:"Retour d'achat  modifier avec success",
          summary:"",
          duration: 3000
         });
         this.router.navigate(['/base/printreturnshipment']);
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
