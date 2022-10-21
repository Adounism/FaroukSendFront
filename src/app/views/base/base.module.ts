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
import { CardsComponent } from './cards/cards.component';
import { SendcreditComponent } from './sendcredits/sendcredit.component';
import { OrangemoneyComponent } from './collapses/orangemoney.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { PrintcustomersComponent } from './printcustomers/printcustomers.component';
import {PrintsupplierComponent } from './printsuppliers/printsuppliers.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TablesComponent } from './tables/tables.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';

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
  ],
  declarations: [
    CustomersComponent,
    SuppliersComponent,
    CardsComponent,
    SendcreditComponent,
    OrangemoneyComponent,
    ListGroupsComponent,
    PrintcustomersComponent,
    PrintsupplierComponent,
    PaginationsComponent,
    PopoversComponent,
    ProgressComponent,
    SpinnersComponent,
    TablesComponent,
    TooltipsComponent,
    TabsComponent,
    PlaceholdersComponent,
  ],
})
export class BaseModule {}
