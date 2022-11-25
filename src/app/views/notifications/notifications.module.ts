import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  DropdownModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PaginationModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NotificationsRoutingModule } from './notifications-routing.module';

import { AlertsComponent } from './alerts/alerts.component';
import { BadgesComponent } from './badges/badges.component';
import { ModalsComponent } from './modals/modals.component';
// import { ToastsComponent } from './toasts/toasts.component';
import { ToastersComponent } from './toasters/toasters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppToastComponent } from './toasters/toast-simple/toast.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AddTransactionComponent } from './addTransaction/addtransaction.component';
import { TransactionComponent } from './transactions/transaction.component';
import { EditTransactionComponent } from './editTransaction/edittransaction.component';

@NgModule({
  declarations: [
    BadgesComponent,
    AlertsComponent,
    ModalsComponent,
    // ToastsComponent,
    ToastersComponent,
    AppToastComponent,
    AddTransactionComponent,
    TransactionComponent,
    EditTransactionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationsRoutingModule,
    DocsComponentsModule,
    AlertModule,
    GridModule,
    CardModule,
    BadgeModule,
    ButtonModule,
    FormModule,
    ModalModule,
    ToastModule,
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
    SharedModule,
    UtilitiesModule,
    TooltipModule,
    PopoverModule,
    ProgressModule,
    IconModule,
    NgxPaginationModule,
    MdbModalModule,
    NgbModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
})
export class NotificationsModule {
}
