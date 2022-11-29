import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { Observable, Subscription } from 'rxjs';
import{TransfertcreditService} from '../../../services/transfertcredit.service'

@Component({
  selector: 'app-importedtransaction',
  templateUrl: './importedtransaction.component.html',
  styleUrls: ['./importedtransaction.component.scss']
})
export class ImportedtransactionComponent implements OnInit {

  
	hoveredDate: NgbDate | null = null;

	fromDate!: NgbDate | null;
	toDate!: NgbDate | null;
  page: number = 1;
  total: number = 0;
  visible = true;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;


  transactionForm!: FormGroup;
  clientListe: any[]=[];
  listeTransactions: any[]=[];
  transactionData:any;

  
  searchText= "";
  fileName = '';
  uploadProgress!: number;
  uploadSub!: Subscription;

  constructor(private ngxComfirmService: NgxBootstrapConfirmService,
    private transferCreditService:TransfertcreditService,
    private toast: NgToastService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) { }

  ngOnInit(): void {
    this.isEmpty(this.fromDate, this.toDate);
  }
  toggleCollapse(): void {
    this.visible = !this.visible;
  }


  getTransactionList(){
    this.transferCreditService.getAlltransfertcredit(this.page).subscribe(data=>{
      this.listeTransactions = data;
      this.listeTransactions.reverse();
      this.total = data.length;
      console.log(this.listeTransactions);
      
    })
  }

  
  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      this.listeTransactions = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.transferCreditService.findByRangeDate(fromdateFormate, this.toDate = null).subscribe(data=>{
        this.listeTransactions = data;
      })

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let todateFormate = this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      this.listeTransactions = [];
      this.transferCreditService.findByRangeDate(fromdateFormate, todateFormate).subscribe(data=>{
        this.listeTransactions = data;
      })
		} 
    else {
			this.toDate = null;
			this.fromDate = date;

      this.listeTransactions = [];
      let fromdateFormate = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      console.log(fromdateFormate);
      this.transferCreditService.findByRangeDate(fromdateFormate, this.toDate = null).subscribe(data=>{
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

    onFileSelected(event:any) {

      const file:File = event.target.files[0];
  
      if (file) {
  
          this.fileName = file.name;
  
          const formData = new FormData();
  
          formData.append("file", file);
          console.log(this.fileName);
  
          this.transferCreditService.upload(formData).then(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;

                console.log(this.message);
                
              }
         
              
              if(event.success){
                this.toast.success({
                  detail:"Fichier uploader",
                  summary:"",
                  duration: 3000
                  });
                  this.getTransactionList();
              }
            },
            (err: any) => {
              console.log(err);
              this.progress = 0;
  
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }
            });
        //  const upload$ = this.transferCreditService.post("/api/thumbnail-upload", formData);
  
        //   upload$.subscribe();
      }
  }

  deleteTransaction(id:number){

    this.ngxComfirmService.confirm({
      title:'Voulez-vous supprimer cette Transaction?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }).then((res: boolean) => {
      if (res) {
        this.transferCreditService.delete(id).subscribe(data=>{
          this.toast.success({
            detail:"Transaction deleted",
            summary:data.body.message,
            duration: 3000
            });
          // if(data.status == 204){

          //   }
            this.getTransactionList();
          
        },error=>{

          this.toast.warning({
            detail:"La transaction est inexistante!!!",
            summary:error.body.message,
            duration: 3000
           });
        })

      } else {
        console.log('Cancel');
      }
    });


  }

  onsearch(event:any){
    this.searchText = event;
    if(this.searchText != ""){

      this.listeTransactions = [];
      this.transferCreditService.searchtransfertcredit(this.searchText).subscribe(data=>{
        this.listeTransactions = data;
        console.log(this.listeTransactions);
        
     });
    }else{
      this.getTransactionList();
    }
  }
}
