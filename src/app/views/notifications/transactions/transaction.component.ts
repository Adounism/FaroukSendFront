import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import {TransactionsService} from '../../../services/transactions.service';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-collapses',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{

	hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
	toDate!: NgbDate | null;
  page: number = 1;
  total: number = 0;


  transactionForm!: FormGroup;
  clientListe: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;

  
  searchText= "";
  fileName = '';
  uploadProgress!: number;
  uploadSub!: Subscription;


  constructor(private clientService: ClientService,
     private transService: TransactionsService,
      private operationService: OperationsService,
      private ngxComfirmService: NgxBootstrapConfirmService,
      private toast: NgToastService,
      private calendar: NgbCalendar,
     public formatter: NgbDateParserFormatter) {

      // this.fromDate = calendar.getToday();
      // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    
    this.getTransactionList();

  }
  ngOnInit(): void {
    this.isEmpty(this.fromDate, this.toDate);
   
    this.transactionForm = new FormGroup({
  
      montant: new FormControl([
        Validators.required,
        Validators.minLength(2),
      ]),
  
      client: new FormControl([
        Validators.required,
      ]),
      operation: new FormControl([
        Validators.required,
      ]),
  
    });
  }

  getTransactionList(){
    this.transService.getAllTransaction(this.page).subscribe(data=>{
      this.listeTransactions = data;
      this.listeTransactions.reverse();
      this.total = data.length;
      console.log(this.listeTransactions);
      
    })
  }

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);
        console.log(this.fileName);
        

      //  const upload$ = this.transService.post("/api/thumbnail-upload", formData);

      //   upload$.subscribe();
    }
}

  deleteTransaction(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez vous effacer cette Transaction?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.transService.delete(id).subscribe({
          next: data=>{
            if(data.status == 200){
    
              this.toast.success({
                detail:"Transaction deleted",
                summary:data.body.message,
                duration: 3000
               });
               this.getTransactionList();
            }
            
          },
          error: error=>{
            if(error.status == 404){
    
              this.toast.warning({
                detail:"La transaction est inexistante!!!",
                summary:error.body.message,
                duration: 3000
               });
            } 
          }
        });
      } else {
        console.log('Cancel');
      }
    });


  }
 

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      this.listeTransactions = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.transService.findByRangeDate(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.listeTransactions = data;
      })

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.listeTransactions = [];
      this.transService.findByRangeDate(fromdateFormate, todateFormate).subscribe(data=>{
        this.listeTransactions = data;
      })
		} 
    else {
			this.toDate = null;
			this.fromDate = date;

      this.listeTransactions = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.transService.findByRangeDate(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.listeTransactions = data;
      })

		}
	}

  isEmpty(fromDate: any, toDate:any){
    if(!fromDate || !toDate){
      this.getTransactionList();
    }
  }

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  searchTransactionByDateRange(from:any, to: any){

  }

      /**
   * Write code on Method
   *
   * @return response()
   */
    pageChangeEvent(event: number){
        this.page = event;
        this.getTransactionList();
    }
  
    onTableDataChange(event: any) {
      this.page = event;
      this.getTransactionList();
    }
}
