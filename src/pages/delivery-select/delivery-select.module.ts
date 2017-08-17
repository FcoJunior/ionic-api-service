import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliverySelectPage } from './delivery-select';

@NgModule({
  declarations: [
    DeliverySelectPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliverySelectPage),
  ],
})
export class DeliverySelectPageModule {}
