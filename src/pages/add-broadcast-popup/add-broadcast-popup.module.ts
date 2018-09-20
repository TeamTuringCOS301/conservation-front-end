import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBroadcastPopupPage } from './add-broadcast-popup';

@NgModule({
  declarations: [
    AddBroadcastPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBroadcastPopupPage),
  ],
  entryComponents: [
    AddBroadcastPopupPage
  ]
})
export class AddBroadcastPopupPageModule {}
