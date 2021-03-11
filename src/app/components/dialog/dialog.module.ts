import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogConfirmComponent } from './dialog.confirm.component';

@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class DialogModule {}
