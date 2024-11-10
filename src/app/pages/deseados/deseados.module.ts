import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeseadosPageRoutingModule } from './deseados-routing.module';

import { DeseadosPage } from './deseados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeseadosPageRoutingModule
  ],
  declarations: [DeseadosPage]
})
export class DeseadosPageModule {}
