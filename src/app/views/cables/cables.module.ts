import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CablesRoutingModule } from './cables-routing.module';
import { CablesComponent } from './cables.component';
import { FormModule } from './form/form.module';


@NgModule({
  declarations: [CablesComponent],
  imports: [
    CommonModule,
    CablesRoutingModule,
    FormModule
  ]
})
export class CablesModule { }
