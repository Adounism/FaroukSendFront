import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { TransactionsService } from 'src/app/services/transactions.service';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  searchText ='';

  // historiqueAchats:any[]=[];
  supplierData:any;
  page: number = 1;
  total: number = 0;
  constructor( private route: ActivatedRoute,
    private router: Router, private supplierService: SupplierService, private purchaseService: PurchasesService) {
   
  }
  ngOnInit(): void {
    this.getAllSupplier();
  }

  // getAchatHistorique(){
  //   this.purchaseService.getAllPurchase().subscribe(op=>{
  //     this.historiqueAchats = op;
  //     this.getSupplierPurchase(this.historiqueAchats);
  //   });
  // }
  
  getProviderTotalPurchase(provider:any){
    let total = 0;

    provider['purchases'].forEach((p:any)=>{
      total+=p['amount'];

      

    })
    
    return total;
  }

  getProviderTotalPurchaseNumber(provider:any){
    let total = 0;
    let pCount=0;
    provider['purchases'].forEach((p:any)=>{
      // total+=p['amount'];
      pCount ++;
      

    })
    // console.log(pCount);
    
    return pCount;
  }


  getProviderName(provider:any){
    let name = "Aucun"
    if (provider['individual']!==null) {
      name = provider['individual']['firstName']+" "+provider['individual']['lastName']
    }
    if (provider['business']!==null) {
      name = provider['business']['name']
    }
    return name
  }

  
  getAllSupplier(){
    this.supplierService.getAllProviders().subscribe(data=>{
      this.supplierData = data;

      
    })
  }



  // getSupplierPurchase(supplier: any){
  //   let achat:any = {}

  //   supplier["purchases"].forEach((trans:any, index:number)=>{   

  //     console.log(trans);
      
  //       let key = trans["operation"]["name"];
  //       if(achat[key]){
  //         achat[key] += trans["amount"];

  //       }else{
  //         achat[key] = trans["amount"];
  //       }
  //     })
  //     return Object.keys(achat).map((k:any)=>({"key":k,"value":achat[k]}));
  // }
  


}
