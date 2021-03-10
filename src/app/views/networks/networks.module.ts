import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworksRoutingModule } from './networks-routing.module';
import { NetworksComponent } from './networks.component';
import { FormModule } from './form/form.module';


@NgModule({
  declarations: [NetworksComponent],
  imports: [
    CommonModule,
    NetworksRoutingModule,
    FormModule
  ]
})
export class NetworksModule { }
