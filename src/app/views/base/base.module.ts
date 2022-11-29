import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavbarModule,
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

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// utils
import { DocsComponentsModule } from '@docs-components/docs-components.module';

// views
import { CustomersComponent } from './customers/customers.component';
import {  SuppliersComponent } from './suppliers/suppliers.component';
import { HistoryComponent } from './historiques/historique.component';
import { AddOperationComponent } from './addoperation/addoperation.component';
import {  TransactionComponent } from '../notifications/transactions/transaction.component';
import {  EditOperationComponent } from './editoperation/editoperation.component';
import { PrintcustomersComponent } from './printcustomers/printcustomers.component';
import {PrintsupplierComponent } from './printsuppliers/printsuppliers.component';
import { PaginationsComponent } from '../icons/encaissements/encaissement.component';
import { AddTransactionComponent } from '../notifications/addTransaction/addtransaction.component';
import { PrintAchatComponent } from './listeachat/printachat.component';
import { EditCustomerComponent } from './editcustomer/editcustomer.component';
import { AddPurchaseComponent } from './addpurchase/addpurchase.component';
import { EditSupplierComponent } from './editsupplier/editsupplier.component';
import { OperationComponent } from './operation/operation.component';
import { EditTransactionComponent } from '../notifications/editTransaction/edittransaction.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/pipes/search.pipe';
// import { SearchPipe } from 'src/app/pipes/search.pipe';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DecaissementComponent } from '../icons/decaissement/decaissement.component';
import { AddcardsaleComponent } from '../charts/addcardsale/addcardsale.component';
import { PrintcardsaleComponent } from '../charts/printcardsale/printcardsale.component';
import { EditcardsaleComponent } from '../charts/editcardsale/editcardsale.component';
import { AddmobiletransactionComponent } from '../icons/addmobiletransaction/addmobiletransaction.component';
import { PrintmobiletransactionComponent } from '../icons/printmobiletransaction/printmobiletransaction.component';
import { EditmobiletransactionComponent } from '../icons/editmobiletransaction/editmobiletransaction.component';
import { AddreturnshipmentComponent } from '../icons/addreturnshipment/addreturnshipment.component';
import { PrintreturnshipmentComponent } from '../icons/printreturnshipment/printreturnshipment.component';
import { EditreturnshipmentComponent } from '../icons/editreturnshipment/editreturnshipment.component';
import { AddcreditPurchaseComponent } from './addcredit-purchase/addcredit-purchase.component';
import { EditcreditPurchaseComponent } from '../buttons/editcredit-purchase/editcredit-purchase.component';
import { PrintcreditPurchaseComponent } from '../buttons/printcredit-purchase/printcredit-purchase.component';
import { AddcartePurchaseComponent } from '../buttons/addcarte-purchase/addcarte-purchase.component';
import { EditcartePurchaseComponent } from '../buttons/editcarte-purchase/editcarte-purchase.component';
import { PrintcartePurchaseComponent } from '../buttons/printcarte-purchase/printcarte-purchase.component';
import { AddmobileTransPurchaseComponent } from '../buttons/addmobile-trans-purchase/addmobile-trans-purchase.component';
import { EditmobileTransPurchaseComponent } from '../buttons/editmobile-trans-purchase/editmobile-trans-purchase.component';
import { PrintmobileTransPurchaseComponent } from '../buttons/printmobile-trans-purchase/printmobile-trans-purchase.component';
import { AddencaissementComponent } from '../icons/addencaissement/addencaissement.component';
import { EditencaissementComponent } from '../icons/editencaissement/editencaissement.component';
import { AdddecaissementComponent } from '../icons/adddecaissement/adddecaissement.component';
import { EditdecaissementComponent } from '../icons/editdecaissement/editdecaissement.component';
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
    NavbarModule,
    TableModule,
    DocsComponentsModule,
    NgxPaginationModule,
    MdbModalModule,
    ButtonGroupModule,
    NgbModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,


    
  ],
  declarations: [
    // CustomersComponent,
    // SuppliersComponent,
    // HistoryComponent,
    AddOperationComponent,
    // TransactionComponent,
    EditOperationComponent,
    // PrintcustomersComponent,
    // PrintsupplierComponent,
    // EditCustomerComponent,
    // EditSupplierComponent,
    OperationComponent,

    // AddTransactionComponent,
    // SearchPipe,

  ],
})
export class BaseModule {}
