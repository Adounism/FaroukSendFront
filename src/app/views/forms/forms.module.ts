import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  BreadcrumbModule,
  CollapseModule,
  PopoverModule,
  SharedModule,
  TableModule,
  TooltipModule,
  CarouselModule,
  UtilitiesModule,
  SpinnerModule,
  PlaceholderModule
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { FormsRoutingModule } from './forms-routing.module';
import { RangesComponent } from './ranges/ranges.component';
import { FloatingLabelsComponent } from './floating-labels/floating-labels.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { SelectComponent } from './select/select.component';
import { ChecksRadiosComponent } from './checks-radios/checks-radios.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidationComponent } from './validation/validation.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconModule } from '@coreui/icons-angular';


@NgModule({
  declarations: [
    RangesComponent,
    FloatingLabelsComponent,
    FormControlsComponent,
    SelectComponent,
    ChecksRadiosComponent,
    InputGroupsComponent,
    LayoutComponent,
    ValidationComponent,

  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    DocsComponentsModule,
    CardModule,
    BreadcrumbModule,
    FormModule,
    CollapseModule,
    GridModule,
    ButtonModule,
    PopoverModule,
    FormsModule,
    ReactiveFormsModule,
    PlaceholderModule,

    ButtonModule,
    IconModule,
    ButtonGroupModule,
    UtilitiesModule,
    SpinnerModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    CarouselModule,
    TableModule,

    NgbModule,
    TooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,


  ]
})
export class CoreUIFormsModule {
}
