import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { ButtonGroupsComponent } from './button-groups/button-groups.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';

import { ButtonsRoutingModule } from './buttons-routing.module';

import {
  AlertModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ModalModule,
  NavbarModule,
  NavModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  
  SpinnerModule,
  TableModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { AchatComponent } from './achats/achat.component';
import { AddcreditPurchaseComponent } from '../base/addcredit-purchase/addcredit-purchase.component';
import { EditcreditPurchaseComponent } from './editcredit-purchase/editcredit-purchase.component';
import { PrintcreditPurchaseComponent } from './printcredit-purchase/printcredit-purchase.component';
import { AddcartePurchaseComponent } from './addcarte-purchase/addcarte-purchase.component';
import { EditcartePurchaseComponent } from './editcarte-purchase/editcarte-purchase.component';
import { PrintcartePurchaseComponent } from './printcarte-purchase/printcarte-purchase.component';
import { AddmobileTransPurchaseComponent } from './addmobile-trans-purchase/addmobile-trans-purchase.component';
import { EditmobileTransPurchaseComponent } from './editmobile-trans-purchase/editmobile-trans-purchase.component';
import { PrintmobileTransPurchaseComponent } from './printmobile-trans-purchase/printmobile-trans-purchase.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AddPurchaseComponent } from '../base/addpurchase/addpurchase.component';
import { PrintAchatComponent } from '../base/listeachat/printachat.component';
import { AppToastComponent } from '../notifications/toasters/toast-simple/toast.component';
import { ToastersComponent } from '../notifications/toasters/toasters.component';

@NgModule({
  declarations: [
    AchatComponent,
    ButtonGroupsComponent,
    DropdownsComponent,
    AddcreditPurchaseComponent,
    EditcreditPurchaseComponent,
    PrintcreditPurchaseComponent,
    AddcartePurchaseComponent,
    EditcartePurchaseComponent,
    PrintcartePurchaseComponent,
    AddmobileTransPurchaseComponent,
    EditmobileTransPurchaseComponent,
    PrintmobileTransPurchaseComponent,
    AddcartePurchaseComponent,
    AddPurchaseComponent,
    PrintAchatComponent
  ],
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    IconModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    CarouselModule,
    SharedModule,
    AlertModule,
    FormModule,
    PopoverModule,
    ModalModule,
    TooltipModule,
    FormsModule,
    SpinnerModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    NavbarModule,
    ProgressModule,
    TableModule,
    NgxPaginationModule,
    MdbModalModule,
    NgbModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ]
})
export class ButtonsModule {
}
