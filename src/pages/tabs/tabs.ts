import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { StockPage } from '../stock/stock';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StockPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
