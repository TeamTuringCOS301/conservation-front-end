import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BroadcastPopupPage } from './broadcast-popup';

@NgModule({
  declarations: [
    BroadcastPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(BroadcastPopupPage),
  ],
  entryComponents: [
    BroadcastPopupPage
  ]
})
export class BroadcastPopupPageModule {}
