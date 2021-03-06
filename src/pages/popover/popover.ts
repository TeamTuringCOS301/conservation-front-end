import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

@IonicPage({})
@Component({
  	selector: 'page-popover',
  	templateUrl: 'popover.html',
})
export class PopoverPage {

  	option:any;
	  constructor(public navCtrl: NavController, public navParams: NavParams,
		public popoverCtrl: PopoverController, public viewCtrl: ViewController) {
	  
	}

	public submitOption(option)
	{
		let jsonRes = {
			option: option
		};
		this.viewCtrl.dismiss(jsonRes);
	}
  
}
