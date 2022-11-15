import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgToastService } from 'ng-angular-popup';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-spinners',
  templateUrl: './addpurchase.component.html',
  styleUrls: ['./addpurchase.component.scss']
})
export class AddPurchaseComponent implements OnInit{



  profileForm!: FormGroup;

  submitted = false;
  selected!:number;

  // firstName:string;
  // lastName:string;
  // address:string;
  // phone:string;
  // email:string;
  // typeFournisseur:string;
  // business:string;
  default!:boolean;
  second!:boolean;
  chekisValid!:boolean;
  supplierData:any;


  purchaseForm!: FormGroup;
  supplierListe: any[]=[];
  individualListe:any[]=[];
  businessListe:any[]=[];
  purchaseData:any;
  contactListeName: any[]=[];

  constructor(private supplierService: SupplierService, 
    private purchaseService: PurchasesService,
    private toast: NgToastService,
    private router:Router,
    private fb: FormBuilder,
    private service: SupplierService,
    private modalService: MdbModalService,) { }
  ngOnInit(): void {

    this.getAllSuppliers();
    this.purchaseForm = this.fb.group({
      montant: ['', [Validators.required]],
      iprovider: ['', [Validators.nullValidator]],
      bprovider: ['', [Validators.nullValidator]],
  
    });

    this.profileForm = this.fb.group({
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
      adresse: ['', [Validators.nullValidator]],
      firstPhone: ['', [Validators.required, Validators.minLength(4)]],
      secondPhone: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator]],
      businessName: ['', [Validators.nullValidator]],
      business:['', [Validators.nullValidator]],
      induvidual:['', [Validators.nullValidator]]
    });

  }

  getAllSuppliers(){
    this.supplierService.getAllProviders().subscribe(data=>{
      if(data){

        this.supplierListe = data;
        console.log(this.supplierListe);
        
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
      if(supplier.business){

        this.businessListe.push(supplier);
        console.log(this.businessListe);
      }
      
    }

  }

  openModal(content:any){
    this.modalService.open(content);
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
            "provider": '/api/providers/'+this.purchaseData.iprovider["id"]
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
            "provider": '/api/providers/'+this.purchaseData.bprovider["id"],
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


  
  typeChanged(e:any){
    console.log(e.value);

    // this.profileForm.get('typeFournisseur')!.valueChanges.subscribe(data=>{
    //   console.log(data);
      
    // }
    //   )
    
    if(e.value == 1){

      this.selected = 1;
      
      this.profileForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        adresse: ['', [Validators.nullValidator]],
  
        phone: ['', [Validators.required, Validators.minLength(4)]],
  
        email: ['', [Validators.nullValidator]],
        business:['', [Validators.nullValidator]]
        
      });
  
    }else if(e.value== 2){
      this.selected = 2;

      this.profileForm = this.fb.group({
        // adresse: ['', [Validators.nullValidator]],
  
        // phone: ['', [Validators.required, Validators.minLength(4)]],
  
        // email: ['', [Validators.nullValidator]],
        business:['', [Validators.nullValidator]],
  
        // typeFournisseur:['', [Validators.required]]
      });

    }
    
  }


  ajouterFounisseur() {
    this.submitted = true;
    this.supplierData = this.profileForm.value;
    
    if(this.default == undefined || this.second == undefined){
      console.log("checked value no checked");
      this.toast.warning({
        detail:"Field Error",
        summary:"Le typde de Fournisseur est réquis",
        duration: 3000
        });
      
    }
    
    if(this.supplierData.induvidual != ""){
      if(!this.supplierData.firstName || !this.supplierData.lastName){
      this.toast.warning({
        detail:"Field Error",
        summary:"Nom et prenom sont requis",
        duration: 3000
        });
      }else{
        let fname = this.supplierData.firstName;
        let lname = this.supplierData.lastName;
        let provider = {
          "firstPhone" : this.supplierData.firstPhone,
          "secondPhone": this.supplierData.secondPhone,
          "email": this.supplierData.email,
          "individual": {
            "firstName": fname,
            "lastName":lname,
          },

        }

        this.service.create(provider).then(response=>{
          console.log(response);
          this.router.navigate(['/base/listsuppliers']);
          
        }, error=>{
          console.log(error);
          
        })
        
        // console.log("Send Data to Back");
        
      }  
    }

    if(this.supplierData.business != ""){
      if(!this.supplierData.businessName){

        this.toast.warning({
          detail:"Field Error",
          summary:"Le nom du Business est requis!!",
          duration: 3000
          });
      }else{
        console.log("send data to Back!!");
                
        let provider = {
          "firstPhone" : this.supplierData.firstPhone,
          "secondPhone": this.supplierData.secondPhone,
          "email": this.supplierData.email,
          "businessCollection": [{
            "name": this.supplierData.businessName,
        
          },]
        }

        this.service.create(provider).then
        (response=>{
          this.router.navigate(['/base/listsuppliers']);
          
        })
      }

    }
  }

  verifieCheck(){

    this.profileForm.get('induvidual')?.valueChanges.subscribe(async data=>{
      this.default = true;
      this.second = false;
      console.log(data);
      
    });

    this.profileForm.get('business')?.valueChanges.subscribe(data=>{
      this.default = false;
      this.second = true;
      console.log(data);
      
    });
  }

}
