import { Component } from '@angular/core';
import {ClientService} from '../../../services/client.service';

@Component({
  selector: 'app-navs',
  templateUrl: './printcustomers.component.html',
  styleUrls: ['./printcustomers.component.scss']
})
export class PrintcustomersComponent {

  constructor(private clientService: ClientService) { 

  this.getAllClient();
  }

  getAllClient(){
    console.log("okay");
    
    this.clientService.getAllClient().subscribe((data)=>{

      console.log("all clients data"+data);
      
    })
  }
}

