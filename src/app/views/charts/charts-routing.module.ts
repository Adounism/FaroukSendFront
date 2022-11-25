import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcardsaleComponent } from './addcardsale/addcardsale.component';

import { ChartsComponent } from './charts.component';
import { EditcardsaleComponent } from './editcardsale/editcardsale.component';
import { PrintcardsaleComponent } from './printcardsale/printcardsale.component';

const routes: Routes = [
  {
    path: '',
    component: PrintcardsaleComponent,
    data: {
      title: 'vente-carte',
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
    path: 'printcardsale',
    component: PrintcardsaleComponent,
    // canActivate:[AuthGuard],
    data: {
      title: 'Liste des Ventes de carte',
    },
  },



  {
    path: 'editcardsale/:id',
    component: EditcardsaleComponent,
    // canActivate:[AuthGuard],
    data: {
      title: 'Modifier la vente carte',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}

