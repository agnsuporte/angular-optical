import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'new', component: FormComponent },
  { path: 'update/:id', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
