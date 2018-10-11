import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'StockPage';
  tab2Root = 'AlertPage';
  tab3Root = 'BroadcastPage';
  tab4Root = 'ProfilePage';

  constructor() {

  }
}
