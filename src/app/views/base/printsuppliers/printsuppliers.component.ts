import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../../../services/supplier.service';

@Component({
  selector: 'app-navs',
  templateUrl: './printsuppliers.component.html',
  styleUrls: ['./printsuppliers.component.scss']
})
export class PrintsupplierComponent implements OnInit{

  providers: any[]=[];

  constructor(private supplierService: SupplierService) { }
  ngOnInit(): void {
    this.getAllProviders();
  }

  getAllProviders(){
    
    this.supplierService.getAllProviders().subscribe(async data=>{
      this.providers = data['hydra:member'];
      JSON.stringify(this.providers); 
      console.log(data['hydra:member']);
      
    },
    async error => {
      console.log(error.message);
    });
    
  }
}

