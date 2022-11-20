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
import { PaginationsComponent } from './encaissements/encaissement.component';
import { PrintAchatComponent } from './listeachat/printachat.component';
import { EditCustomerComponent } from './editcustomer/editcustomer.component';
import { AddPurchaseComponent } from './addpurchase/addpurchase.component';
import { EditSupplierComponent } from './editsupplier/editsupplier.component';
import { OperationComponent } from './operation/operation.component';
import { EditTransactionComponent } from './editTransaction/edittransaction.component';
import { AddTransactionComponent } from './addTransaction/addtransaction.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddcardsaleComponent } from './addcardsale/addcardsale.component';
import { PrintcardsaleComponent } from './printcardsale/printcardsale.component';
import { PrintmobiletransactionComponent } from './printmobiletransaction/printmobiletransaction.component';
import { AddmobiletransactionComponent } from './addmobiletransaction/addmobiletransaction.component';
import { EditmobiletransactionComponent } from './editmobiletransaction/editmobiletransaction.component';
import { PrintreturnshipmentComponent } from './printreturnshipment/printreturnshipment.component';
import { AddreturnshipmentComponent } from './addreturnshipment/addreturnshipment.component';
import { EditreturnshipmentComponent } from './editreturnshipment/editreturnshipment.component';
import { PrintcreditPurchaseComponent } from './printcredit-purchase/printcredit-purchase.component';
import { PrintcartePurchaseComponent } from './printcarte-purchase/printcarte-purchase.component';
import { AddcartePurchaseComponent } from './addcarte-purchase/addcarte-purchase.component';
import { EditcartePurchaseComponent } from './editcarte-purchase/editcarte-purchase.component';
import { AddencaissementComponent } from './addencaissement/addencaissement.component';
import { EditencaissementComponent } from './editencaissement/editencaissement.component';
import { DecaissementComponent } from './decaissement/decaissement.component';
import { AdddecaissementComponent } from './adddecaissement/adddecaissement.component';
import { PrintmobileTransPurchaseComponent } from './printmobile-trans-purchase/printmobile-trans-purchase.component';

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

      //ENCAISSEMENT
      {
        path: 'encaissement',
        component: PaginationsComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Encaissement',
        },
      },

      {
        path: 'addencaissement',
        component: AddencaissementComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Ajouter un encaissement',
        },
      },

      {
        path: 'editencaissement/:id',
        component: EditencaissementComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Modifier L'encaissement",
        },
      },


      //DECAISSEMENT
      {
        path: 'decaissement',
        component: DecaissementComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Liste des décaissements',
        },
      },

      {
        path: 'add-decaissement',
        component: AdddecaissementComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Ajouter un décaissement',
        },
      },

      {
        path: 'decaissement/:id',
        component: EditencaissementComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Modifier Le décaissement",
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
        path: 'editsupplier/:id',
        component: EditSupplierComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Edit Supplier',
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


      //New Routes Add 

      {
        path: 'printcardsale',
        component: PrintcardsaleComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Liste des Ventes de carte',
        },
      },

      {
        path: 'addcardsale',
        component: AddcardsaleComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Ajoute une vente de carte',
        },
      },

      {
        path: 'editcardsale/:id',
        component: AddcardsaleComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Modifier la vente carte',
        },
      },

      {
        path: 'printmobiletransaction',
        component: PrintmobiletransactionComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Liste des Transactions Mobile',
        },
      },

      {
        path: 'addmobiletransaction',
        component: AddmobiletransactionComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Ajouter une transaction mobile',
        },
      },

      {
        path: 'editmobiletransaction/:id',
        component: EditmobiletransactionComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Modifier une transaction mobile',
        },
      },


      {
        path: 'printreturnshipment',
        component: PrintreturnshipmentComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Liste des retours d'envoi",
        },
      },

      {
        path: 'addreturnshipment',
        component: AddreturnshipmentComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Ajouter une retour d'envoi",
        },
      },

      {
        path: 'editreturnshipment/:id',
        component: EditreturnshipmentComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Modifier une retour d'envoi",
        },
      },

      //Achat Views Routings

      //Achat Crédit
      {
        path: 'printcreditpurchase',
        component: PrintcreditPurchaseComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Liste des Achats de crédit",
        },
      },

      {
        path: 'addcreditpurchase',
        component: AddreturnshipmentComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Ajouter un achat de crédit",
        },
      },

      {
        path: 'editcreditpurchase/:id',
        component: EditreturnshipmentComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Modifier L'achat de crédit",
        },
      },


      //Achat Carte de Credit

      {
        path: 'printcartepurchase',
        component: PrintcartePurchaseComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Liste des Achats de carte",
        },
      },

      {
        path: 'addcartepurchase',
        component: AddcartePurchaseComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Ajouter l'achat de carte de crédit",
        },
      },

      {
        path: 'editcartepurchase/:id',
        component: EditcartePurchaseComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Modifier L'achat de carte de crédit",
        },
      },


            //Achat de Transfert mobile

            {
              path: 'printmobiletransfertpurchase',
              component: PrintmobileTransPurchaseComponent,
              // canActivate:[AuthGuard],
              data: {
                title: "Liste des Achats de Transfert mobile",
              },
            },
      
            {
              path: 'addmobiletransfertpurchase',
              component: AddmobiletransactionComponent,
              // canActivate:[AuthGuard],
              data: {
                title: "Ajouter l'achat de transfert mobile",
              },
            },
      
            {
              path: 'editmobiletransfertpurchase/:id',
              component: EditmobiletransactionComponent,
              // canActivate:[AuthGuard],
              data: {
                title: "Modifier L'achat de transfert mobile",
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

