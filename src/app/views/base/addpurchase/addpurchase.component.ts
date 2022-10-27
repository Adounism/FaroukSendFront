import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-spinners',
  templateUrl: './addpurchase.component.html',
  styleUrls: ['./addpurchase.component.scss']
})
export class AddPurchaseComponent implements OnInit{

  purchaseForm!: FormGroup;
  supplierListe: any[]=[];
  individualListe:any[]=[];
  businessListe:any[]=[];
  purchaseData:any;
  submitted = false;
  constructor(private supplierService: SupplierService, 
    private purchaseService: PurchasesService,
    private toast: NgToastService,
    private router:Router,
    private fb: FormBuilder,) { }
  ngOnInit(): void {

    this.getAllSuppliers();
    this.purchaseForm = this.fb.group({
      montant: ['', [Validators.required]],
      iprovider: ['', [Validators.nullValidator]],
      bprovider: ['', [Validators.nullValidator]],
  
    });

  }

  getAllSuppliers(){
    this.supplierService.getAllProviders().subscribe(data=>{
      if(data['hydra:member']){

        this.supplierListe = data['hydra:member'];

        this.getIndividualListe();
        this.getBusinessListe();
        // console.log(this.supplierListe);
      }
      
    })
  }

  getIndividualListe(){
    for(const supplier of this.supplierListe){
      if(supplier.individual){

        this.individualListe.push(supplier);
        console.log(this.individualListe);
      }
      
    }

  }

  getBusinessListe(){
    for(const supplier of this.supplierListe){
      if(supplier.businessCollection.length > 0){

        this.businessListe.push(supplier);
        console.log(this.businessListe);
      }
      
    }

  }


  ajouter(){

    this.purchaseData = this.purchaseForm.value;
    if(!this.purchaseData.iprovider && !this.purchaseData.bprovider){
      this.toast.warning({
        detail:"Error Field",
        summary:"Veillez choisir un Fournisseur",
        duration: 3000
        });

        
    }else if(this.purchaseData.iprovider && this.purchaseData.bprovider){
      this.toast.warning({
        detail:"Error Field",
        summary:"Veillez choisir  un Fournisseur individual ou business",
        duration: 3000
        });
    }else{

      if(this.purchaseData.montant && this.purchaseData.montant > 0){
        // this.submitted = true;
        
        if(this.purchaseData.iprovider != ""){

          let data = {
            "amount":this.purchaseData.montant,
            "provider": this.purchaseData.iprovider["@id"]
          }
          this.purchaseService.create(data).then(response=>{
            
            this.toast.success({
              detail:"Ajout de  l'achat",
              summary:"ajouter de l'achat en Cours",
              duration: 3000
              });
              this.router.navigate(['/base/listeachats']);
          })
        }else if(this.purchaseData.bprovider != ""){
          let data = {
            "amount":this.purchaseData.montant,
            "provider": this.purchaseData.bprovider["@id"],
          }
          this.purchaseService.create(data).then(response=>{
            this.toast.success({
              detail:"Ajout de  l'achat",
              summary:"ajouter de l'achat en Cours",
              duration: 3000
              });
              this.router.navigate(['/base/listeachats']);
          });
        }

      }else{
        this.toast.warning({
          detail:"Field montant",
          summary:"le montant est invalid",
          duration: 3000
          });
      }



    }
  }

}
