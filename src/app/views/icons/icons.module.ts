import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, ButtonModule, CardModule, CarouselModule, DropdownModule, FormModule, GridModule, ModalModule, NavModule, PaginationModule, ProgressModule, SpinnerModule, TableModule, TabsModule, ToastModule, TooltipModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { CoreUIIconsComponent } from './coreui-icons.component';
import { IconsRoutingModule } from './icons-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PrintmobiletransactionComponent } from './printmobiletransaction/printmobiletransaction.component';
import { AddmobiletransactionComponent } from './addmobiletransaction/addmobiletransaction.component';
import { EditmobiletransactionComponent } from './editmobiletransaction/editmobiletransaction.component';
import { PrintreturnshipmentComponent } from './printreturnshipment/printreturnshipment.component';
import { AddreturnshipmentComponent } from './addreturnshipment/addreturnshipment.component';
import { EditreturnshipmentComponent } from './editreturnshipment/editreturnshipment.component';
import { DecaissementComponent } from './decaissement/decaissement.component';
import { AdddecaissementComponent } from './adddecaissement/adddecaissement.component';
import { EditdecaissementComponent } from './editdecaissement/editdecaissement.component';
import { PaginationsComponent } from './encaissements/encaissement.component';
import { AddencaissementComponent } from './addencaissement/addencaissement.component';
import { EditencaissementComponent } from './editencaissement/editencaissement.component';

@NgModule({
  imports: [
    IconsRoutingModule,
    CardModule,
    GridModule,
    IconModule,
    CommonModule,
    DocsComponentsModule,
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
    ReactiveFormsModule,
    CarouselModule,
    DropdownModule,
    PaginationModule,
    TableModule,
    NgxPaginationModule,
    MdbModalModule,
    NgbModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  declarations: [
    CoreUIIconsComponent,
    PrintmobiletransactionComponent,
    AddmobiletransactionComponent,
    EditmobiletransactionComponent,
    PrintreturnshipmentComponent,
    AddreturnshipmentComponent,
    EditreturnshipmentComponent,
    DecaissementComponent,
    AdddecaissementComponent,
    EditdecaissementComponent,
    PaginationsComponent,
    AddencaissementComponent,
    EditencaissementComponent

  ]
})
export class IconsModule {
}
