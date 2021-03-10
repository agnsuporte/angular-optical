import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CablesComponent } from './cables.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: CablesComponent },
  { path: 'new', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CablesRoutingModule { }
