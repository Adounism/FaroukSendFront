import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { HistoryComponent } from './historiques/historique.component';
import { AddOperationComponent } from './addoperation/addoperation.component';
import { TransactionComponent } from '../notifications/transactions/transaction.component';
import { EditOperationComponent } from './editoperation/editoperation.component';
import { PrintcustomersComponent } from './printcustomers/printcustomers.component';
import {PrintsupplierComponent } from './printsuppliers/printsuppliers.component';
import { PaginationsComponent } from '../icons/encaissements/encaissement.component';
import { PrintAchatComponent } from './listeachat/printachat.component';
import { EditCustomerComponent } from './editcustomer/editcustomer.component';
import { AddPurchaseComponent } from './addpurchase/addpurchase.component';
import { EditSupplierComponent } from './editsupplier/editsupplier.component';
import { OperationComponent } from './operation/operation.component';
import { EditTransactionComponent } from '../notifications/editTransaction/edittransaction.component';
import { AddTransactionComponent } from '../notifications/addTransaction/addtransaction.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddcardsaleComponent } from '../charts/addcardsale/addcardsale.component';
import { PrintcardsaleComponent } from '../charts/printcardsale/printcardsale.component';
import { PrintmobiletransactionComponent } from '../icons/printmobiletransaction/printmobiletransaction.component';
import { AddmobiletransactionComponent } from '../icons/addmobiletransaction/addmobiletransaction.component';
import { EditmobiletransactionComponent } from '../icons/editmobiletransaction/editmobiletransaction.component';
import { PrintreturnshipmentComponent } from '../icons/printreturnshipment/printreturnshipment.component';
import { AddreturnshipmentComponent } from '../icons/addreturnshipment/addreturnshipment.component';
import { EditreturnshipmentComponent } from '../icons/editreturnshipment/editreturnshipment.component';
import { PrintcreditPurchaseComponent } from '../buttons/printcredit-purchase/printcredit-purchase.component';
import { PrintcartePurchaseComponent } from '../buttons/printcarte-purchase/printcarte-purchase.component';
import { AddcartePurchaseComponent } from '../buttons/addcarte-purchase/addcarte-purchase.component';
import { EditcartePurchaseComponent } from '../buttons/editcarte-purchase/editcarte-purchase.component';
import { AddencaissementComponent } from '../icons/addencaissement/addencaissement.component';
import { EditencaissementComponent } from '../icons/editencaissement/editencaissement.component';
import { DecaissementComponent } from '../icons/decaissement/decaissement.component';
import { AdddecaissementComponent } from '../icons/adddecaissement/adddecaissement.component';
import { PrintmobileTransPurchaseComponent } from '../buttons/printmobile-trans-purchase/printmobile-trans-purchase.component';
import { EditdecaissementComponent } from '../icons/editdecaissement/editdecaissement.component';
import { AddcreditPurchaseComponent } from './addcredit-purchase/addcredit-purchase.component';
import { AddmobileTransPurchaseComponent } from '../buttons/addmobile-trans-purchase/addmobile-trans-purchase.component';
import { EditcreditPurchaseComponent } from '../buttons/editcredit-purchase/editcredit-purchase.component';
import { EditmobileTransPurchaseComponent } from '../buttons/editmobile-trans-purchase/editmobile-trans-purchase.component';
import { EditcardsaleComponent } from '../charts/editcardsale/editcardsale.component';

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
        path: 'editsupplier/:id',
        component: EditSupplierComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Edit Supplier',
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


      //New Routes Add  Carte de crédit




    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

