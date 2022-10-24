import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';

import { AchatComponent } from './achats/achat.component';
import { ButtonGroupsComponent } from './button-groups/button-groups.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';

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
