import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CardsComponent } from './cards/cards.component';
import { SendcreditComponent } from './sendcredits/sendcredit.component';
import { OrangemoneyComponent } from './orangemoney/orangemoney.component';
import { PrintOrangeMoneyComponent } from './printorangemoney/printorangemoney.component';
import { PrintcustomersComponent } from './printcustomers/printcustomers.component';
import {PrintsupplierComponent } from './printsuppliers/printsuppliers.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PrintAchatComponent } from './listeachat/printachat.component';
import { EditCustomerComponent } from './editcustomer/editcustomer.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TablesComponent } from './tables/tables.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

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
        // canActivate:[AuthGuard],
        data: {
          title: 'Ajouter un client',
        },
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Ajouter un founisseur',
        },
      },
      {
        path: 'cards',
        component: CardsComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Cards',
        },
      },
      {
        path: 'sendcredit',
        component: SendcreditComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Send Credit',
        },
      },
      {
        path: 'orangemoney',
        component: OrangemoneyComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Orange Money opérations',
        },
      },
      {
        path: 'orangemoneyop',
        component: PrintOrangeMoneyComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Liste des opérations orange Money',
        },
      },
      {
        path: 'listcustomers',
        component: PrintcustomersComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'List des Clients',
        },
      },

      {
        path: 'listsuppliers',
        component: PrintsupplierComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'List des Fournisseurs',
        },
      },

      {
        path: 'pagination',
        component: PaginationsComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Pagination',
        },
      },
      {
        path: 'placeholder',
        component: PlaceholdersComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Placeholder',
        },
      },
      {
        path: 'listeachats',
        component: PrintAchatComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Liste des Achats effectués',
        },
      },
      {
        path: 'editcustomer/:id',
        component: EditCustomerComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Edit Customer',
        },
      },
      {
        path: 'spinners',
        component: SpinnersComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Spinners',
        },
      },
      {
        path: 'tables',
        component: TablesComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Tables',
        },
      },
      {
        path: 'tabs',
        component: TabsComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Tabs',
        },
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        // canActivate:[AuthGuard],
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

