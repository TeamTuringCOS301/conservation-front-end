import { Component } from '@angular/core';

import { AlertPage } from '../alert/alert';
import { StockPage } from '../stock/stock';
import { BroadcastPage } from '../broadcast/broadcast';
import { ProfilePage } from "../profile/profile" 


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StockPage;
  tab2Root = AlertPage;
  tab3Root = BroadcastPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
