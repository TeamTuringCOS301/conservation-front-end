import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockEditPage } from './stock-edit';

@NgModule({
  declarations: [
    StockEditPage,
  ],
  imports: [
    IonicPageModule.forChild(StockEditPage),
  ],
  entryComponents: [
    StockEditPage
  ]
})
export class StockEditPageModule {}
