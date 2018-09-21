import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertPopupPage } from './alert-popup';

@NgModule({
  declarations: [
    AlertPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertPopupPage),
  ],
  entryComponents: [
    AlertPopupPage
  ]
})
export class AlertPopupPageModule {}
