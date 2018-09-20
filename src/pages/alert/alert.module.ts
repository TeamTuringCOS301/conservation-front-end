import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertPage } from './alert';

@NgModule({
  declarations: [
    AlertPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertPage),
  ],
  entryComponents: [
    AlertPage
  ]
})
export class AlertPageModule {}
