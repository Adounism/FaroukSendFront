import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CardsComponent } from './cards/cards.component';
import { SendcreditComponent } from './sendcredits/sendcredit.component';
import { OrangemoneyComponent } from './collapses/orangemoney.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { PrintcustomersComponent } from './printcustomers/printcustomers.component';
import {PrintsupplierComponent } from './printsuppliers/printsuppliers.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TablesComponent } from './tables/tables.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'customers',
        component: CustomersComponent,
        data: {
          title: 'Ajouter un client',
        },
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
        data: {
          title: 'Ajouter un founisseur',
        },
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Cards',
        },
      },
      {
        path: 'sendcredit',
        component: SendcreditComponent,
        data: {
          title: 'Send Credit',
        },
      },
      {
        path: 'orangemoney',
        component: OrangemoneyComponent,
        data: {
          title: 'Orange Money opérations',
        },
      },
      {
        path: 'list-group',
        component: ListGroupsComponent,
        data: {
          title: 'List Group',
        },
      },
      {
        path: 'listcustomers',
        component: PrintcustomersComponent,
        data: {
          title: 'List des Clients',
        },
      },

      {
        path: 'listsuppliers',
        component: PrintsupplierComponent,
        data: {
          title: 'List des Fournisseurs',
        },
      },

      {
        path: 'pagination',
        component: PaginationsComponent,
        data: {
          title: 'Pagination',
        },
      },
      {
        path: 'placeholder',
        component: PlaceholdersComponent,
        data: {
          title: 'Placeholder',
        },
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popovers',
        },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress',
        },
      },
      {
        path: 'spinners',
        component: SpinnersComponent,
        data: {
          title: 'Spinners',
        },
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables',
        },
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs',
        },
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

