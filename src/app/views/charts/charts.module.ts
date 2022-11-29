import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule, BadgeModule, ButtonModule, CardModule, CarouselModule, DropdownModule, FormModule, GridModule, ModalModule, NavModule, PaginationModule, ProgressModule, SpinnerModule, TableModule, TabsModule, ToastModule, TooltipModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { AddcardsaleComponent } from './addcardsale/addcardsale.component';
import { IconModule } from '@coreui/icons-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NotificationsRoutingModule } from '../notifications/notifications-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintcardsaleComponent } from './printcardsale/printcardsale.component';
import { EditcardsaleComponent } from './editcardsale/editcardsale.component';
import { CarteTypeComponent } from './carte-type/carte-type.component';
import { AddcarteTypeComponent } from './addcarte-type/addcarte-type.component';
import { EditcarteTypeComponent } from './editcarte-type/editcarte-type.component';

@NgModule({
  declarations: [ChartsComponent,
    AddcardsaleComponent,
    PrintcardsaleComponent,
    EditcardsaleComponent,
    CarteTypeComponent,
    AddcarteTypeComponent,
    EditcarteTypeComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    ProgressModule,
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
    DropdownModule,
    PaginationModule,
    IconModule,
    TableModule,
    NgxPaginationModule,
    MdbModalModule,
    NgbModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ]
})
export class ChartsModule {
}
