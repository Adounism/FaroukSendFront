import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddreturnshipmentComponent } from './addreturnshipment/addreturnshipment.component';
import { AddmobiletransactionComponent } from './addmobiletransaction/addmobiletransaction.component';

import { CoreUIIconsComponent } from './coreui-icons.component';
import { EditmobiletransactionComponent } from './editmobiletransaction/editmobiletransaction.component';
import { EditreturnshipmentComponent } from './editreturnshipment/editreturnshipment.component';
import { PrintmobiletransactionComponent } from './printmobiletransaction/printmobiletransaction.component';
import { PrintreturnshipmentComponent } from './printreturnshipment/printreturnshipment.component';
import { AdddecaissementComponent } from './adddecaissement/adddecaissement.component';
import { EditdecaissementComponent } from './editdecaissement/editdecaissement.component';
import { DecaissementComponent } from './decaissement/decaissement.component';
import { PaginationsComponent } from './encaissements/encaissement.component';
import { AddencaissementComponent } from './addencaissement/addencaissement.component';
import { EditencaissementComponent } from './editencaissement/editencaissement.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Icons'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'coreui-icons'
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
        component: EditdecaissementComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Modifier Le décaissement",
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

      {
        path: 'coreui-icons',
        component: CoreUIIconsComponent,
        data: {
          title: 'CoreUI Icons'
        }
      },
      {
        path: 'brands',
        component: CoreUIIconsComponent,
        data: {
          title: 'Brands'
        }
      },
      {
        path: 'flags',
        component: CoreUIIconsComponent,
        data: {
          title: 'Flags'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule {
}
