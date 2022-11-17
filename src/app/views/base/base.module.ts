import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// utils
import { DocsComponentsModule } from '@docs-components/docs-components.module';

// views
import { CustomersComponent } from './customers/customers.component';
import {  SuppliersComponent } from './suppliers/suppliers.component';
import { HistoryComponent } from './historiques/historique.component';
import { AddOperationComponent } from './addoperation/addoperation.component';
import {  TransactionComponent } from './transactions/transaction.component';
import {  EditOperationComponent } from './editoperation/editoperation.component';
import { PrintcustomersComponent } from './printcustomers/printcustomers.component';
import {PrintsupplierComponent } from './printsuppliers/printsuppliers.component';
import { PaginationsComponent } from './encaissements/encaissement.component';
import { AddTransactionComponent } from './addTransaction/addtransaction.component';
import { PrintAchatComponent } from './listeachat/printachat.component';
import { EditCustomerComponent } from './editcustomer/editcustomer.component';
import { AddPurchaseComponent } from './addpurchase/addpurchase.component';
import { EditSupplierComponent } from './editsupplier/editsupplier.component';
import { OperationComponent } from './operation/operation.component';
import { EditTransactionComponent } from './editTransaction/edittransaction.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/pipes/search.pipe';
// import { SearchPipe } from 'src/app/pipes/search.pipe';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DecaissementComponent } from './decaissement/decaissement.component';
import { AddcardsaleComponent } from './addcardsale/addcardsale.component';
import { PrintcardsaleComponent } from './printcardsale/printcardsale.component';
import { EditcardsaleComponent } from './editcardsale/editcardsale.component';
import { AddmobiletransactionComponent } from './addmobiletransaction/addmobiletransaction.component';
import { PrintmobiletransactionComponent } from './printmobiletransaction/printmobiletransaction.component';
import { EditmobiletransactionComponent } from './editmobiletransaction/editmobiletransaction.component';
@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    FormsModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    DocsComponentsModule,
    NgxPaginationModule,
    MdbModalModule,
    NgbModule

    
  ],
  declarations: [
    CustomersComponent,
    SuppliersComponent,
    HistoryComponent,
    AddOperationComponent,
    TransactionComponent,
    EditOperationComponent,
    PrintcustomersComponent,
    PrintsupplierComponent,
    PaginationsComponent,
    PrintAchatComponent,
    EditCustomerComponent,
    AddPurchaseComponent,
    EditSupplierComponent,
    OperationComponent,
    EditTransactionComponent,
    AddTransactionComponent,
    SearchPipe,
    DecaissementComponent,
    AddcardsaleComponent,
    PrintcardsaleComponent,
    EditcardsaleComponent,
    AddmobiletransactionComponent,
    PrintmobiletransactionComponent,
    EditmobiletransactionComponent
  ],
})
export class BaseModule {}
