import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { HistoryComponent } from './historiques/historique.component';
import { AddOperationComponent } from './addoperation/addoperation.component';
import { TransactionComponent } from './transactions/transaction.component';
import { EditOperationComponent } from './editoperation/editoperation.component';
import { PrintcustomersComponent } from './printcustomers/printcustomers.component';
import {PrintsupplierComponent } from './printsuppliers/printsuppliers.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PrintAchatComponent } from './listeachat/printachat.component';
import { EditCustomerComponent } from './editcustomer/editcustomer.component';
import { AddPurchaseComponent } from './addpurchase/addpurchase.component';
import { TablesComponent } from './tables/tables.component';
import { OperationComponent } from './operation/operation.component';
import { EditTransactionComponent } from './editTransaction/edittransaction.component';
import { AddTransactionComponent } from './addTransaction/addtransaction.component';
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
        path: 'historique/:id',
        component: HistoryComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Client Historique',
        },
      },
      {
        path: 'addoperation',
        component: AddOperationComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Ajouter une Operation',
        },
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Transaction',
        },
      },
      {
        path: 'editoperation/:id',
        component: EditOperationComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Edit operation',
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
        path: 'addtransaction',
        component: AddTransactionComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'add transaction',
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
        path: 'addpurchase',
        component: AddPurchaseComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Ajouter un Achat',
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
        path: 'edittransaction/:id',
        component: EditTransactionComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Edit Transaction',
        },
      },
      {
        path: 'operation',
        component: OperationComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'operation',
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

