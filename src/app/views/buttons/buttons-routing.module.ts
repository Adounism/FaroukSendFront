import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';

import { AchatComponent } from './achats/achat.component';
import { AddcartePurchaseComponent } from './addcarte-purchase/addcarte-purchase.component';
import { AddcreditPurchaseComponent } from '../base/addcredit-purchase/addcredit-purchase.component';
import { AddmobileTransPurchaseComponent } from './addmobile-trans-purchase/addmobile-trans-purchase.component';
import { ButtonGroupsComponent } from './button-groups/button-groups.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { EditcartePurchaseComponent } from './editcarte-purchase/editcarte-purchase.component';
import { EditcreditPurchaseComponent } from './editcredit-purchase/editcredit-purchase.component';
import { EditmobileTransPurchaseComponent } from './editmobile-trans-purchase/editmobile-trans-purchase.component';
import { PrintcartePurchaseComponent } from './printcarte-purchase/printcarte-purchase.component';
import { PrintcreditPurchaseComponent } from './printcredit-purchase/printcredit-purchase.component';
import { PrintmobileTransPurchaseComponent } from './printmobile-trans-purchase/printmobile-trans-purchase.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'buttons'
      },
      {
        path: 'achats',
        component: AchatComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Enregister un Achat'
        }
      },
      
      //Achat Views Routings

      //Achat Crédit Routes
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
        component: AddcreditPurchaseComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Ajouter un achat de crédit",
        },
      },

      {
        path: 'editcreditpurchase/:id',
        component: EditcreditPurchaseComponent,
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
          title: "Ajouter un achat de carte crédit",
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
        component: AddmobileTransPurchaseComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Ajouter l'achat de transfert mobile",
        },
      },

      {
        path: 'editmobiletransfertpurchase/:id',
        component: EditmobileTransPurchaseComponent,
        // canActivate:[AuthGuard],
        data: {
          title: "Modifier L'achat de transfert mobile",
        },
      },
      {
        path: 'button-groups',
        component: ButtonGroupsComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Button groups'
        }
      },
      {
        path: 'dropdowns',
        component: DropdownsComponent,
        // canActivate:[AuthGuard],
        data: {
          title: 'Dropdowns'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {
}
