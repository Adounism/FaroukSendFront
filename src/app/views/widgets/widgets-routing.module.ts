import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCustomerComponent } from '../base/editcustomer/editcustomer.component';
import { EditSupplierComponent } from '../base/editsupplier/editsupplier.component';
import { HistoryComponent } from '../base/historiques/historique.component';
import { CustomersComponent } from '../base/customers/customers.component';
import { PrintcustomersComponent } from '../base/printcustomers/printcustomers.component';
import { PrintsupplierComponent } from '../base/printsuppliers/printsuppliers.component';
import { SuppliersComponent } from '../base/suppliers/suppliers.component';
import { WidgetsComponent } from './widgets/widgets.component';

const routes: Routes = [
  {
    path: '',
    // component: WidgetsComponent,
    data: {
      title: 'Contacts'
    },
    children:[
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
        path: 'historique/:id',
        component: HistoryComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Client Historique',
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
        path: 'editsupplier/:id',
        component: EditSupplierComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Edit Supplier',
        },
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {
}
