import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import {HistoriqueService} from '../../../services/historique.service';
@Component({
  selector: 'app-cards',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoryComponent implements OnInit{

  historiqueData: any[]=[];
  customerId! :number;
  searchText ='';

  constructor(private clienService: ClientService, private route: ActivatedRoute,
    private router: Router) {
   
  }
  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.getCustomerData();
  }

  getCustomerData(){
    this.clienService.find(this.customerId).subscribe(data=>{
      this.historiqueData = data.transactions;
      console.log(this.historiqueData);
      
    })
  }

}
