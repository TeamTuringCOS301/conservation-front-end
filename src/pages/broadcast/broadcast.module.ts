import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BroadcastPage } from './broadcast';

@NgModule({
  declarations: [
    BroadcastPage,
  ],
  imports: [
    IonicPageModule.forChild(BroadcastPage),
  ],
  entryComponents: [
    BroadcastPage
  ]
})
export class BroadcastPageModule {}
