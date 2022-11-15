import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';


@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.scss']
})
export class RangesComponent {
  supplierData:any[]=[];
  searchText ='';
  total:number=0;
  nombreAchat= 0;
  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getAllSupplier();

  }

  getAllSupplier(){
    this.supplierService.getAllProviders().subscribe(data=>{
      this.supplierData = data;  
      let sum:number=0; 
      data.forEach((element:any) => {
        sum+= this.getProviderTotalPurchase(element);
      });  
      this.total = sum; 
    })
  }

  getProviderTotalPurchase(provider:any){
    let total = 0
    provider['purchases'].forEach((p:any, index:number)=>{
      console.log(index);
      
      total+=p['amount']
      this.nombreAchat++;
    })
    return total;
  }


}
