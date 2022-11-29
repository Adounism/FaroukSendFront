import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PlaceholderModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from './widgets-brand/widgets-brand.component';
import { ChartSample, WidgetsDropdownComponent } from './widgets-dropdown/widgets-dropdown.component';
import { WidgetsEComponent } from './widgets-e/widgets-e.component';
import { PrintcustomersComponent } from './printcustomers/printcustomers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintsupplierComponent } from './printsuppliers/printsuppliers.component';
import { SuppliersComponent } from '../base/suppliers/suppliers.component';
import { CustomersComponent } from '../base/customers/customers.component';
import { HistoryComponent } from '../base/historiques/historique.component';
import { EditCustomerComponent } from '../base/editcustomer/editcustomer.component';
import { EditSupplierComponent } from '../base/editsupplier/editsupplier.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';


@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    ChartSample,
    WidgetsEComponent,
    PrintcustomersComponent,
    PrintsupplierComponent,
    SuppliersComponent,
    CustomersComponent,
    HistoryComponent,
    EditCustomerComponent,
    EditSupplierComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    ListGroupModule,
    PlaceholderModule,
    CardModule,
    FormModule,
    FormsModule,
    UtilitiesModule,
    BreadcrumbModule,
    TooltipModule,
    TabsModule,
    NavModule,
    SpinnerModule,
    ReactiveFormsModule,
    TableModule,
    DocsComponentsModule,
    ProgressModule,
    ChartjsModule,
    NgxPaginationModule,
    MdbModalModule,
    ButtonGroupModule,
    NgbModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  exports: [
    WidgetsBrandComponent,
    WidgetsDropdownComponent
  ]
})
export class WidgetsModule {
}
