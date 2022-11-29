import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BadgesComponent } from './badges/badges.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ModalsComponent } from './modals/modals.component';
import { ToastersComponent } from './toasters/toasters.component';
import { AddTransactionComponent } from './addTransaction/addtransaction.component';
import { TransactionComponent } from './transactions/transaction.component';
import { EditTransactionComponent } from './editTransaction/edittransaction.component';
import { ImportedtransactionComponent } from './importedtransaction/importedtransaction.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'vente-credit'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transaction'
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
        path: 'transaction',
        component: TransactionComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Transaction',
        },
      },

      {
        path: 'importedtransaction',
        component: ImportedtransactionComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Liste des tranferts importés',
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
        path: 'alerts',
        component: AlertsComponent,
        data: {
          title: 'Alerts'
        }
      },
      {
        path: 'badges',
        component: BadgesComponent,
        data: {
          title: 'Badges'
        }
      },
      {
        path: 'modal',
        component: ModalsComponent,
        data: {
          title: 'Modal'
        }
      },
      {
        path: 'toasts',
        component: ToastersComponent,
        data: {
          title: 'Toasts'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {
}
