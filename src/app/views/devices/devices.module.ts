import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { FormModule } from './form/form.module';


@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    FormModule
  ]
})
export class DevicesModule { }
