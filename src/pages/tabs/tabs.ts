import { Component } from '@angular/core';

import { AlertPage } from '../alert/alert';
import { StockPage } from '../stock/stock';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StockPage;
  tab2Root = AlertPage;

  constructor() {

  }
}
