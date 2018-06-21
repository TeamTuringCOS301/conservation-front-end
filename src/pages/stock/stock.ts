import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Http } from '../../http-api';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage {
    
    requestProduct:any;
    stock:any;
    product:any;   

    constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController) 
    {        
        this.requestProduct = new FormGroup({
            name: new FormControl(), 
            price: new FormControl(),
            description: new FormControl(),
            imagePath: new FormControl()
            });

        this.stock = [];
        this.product = {};
        /*
        this.http.get("/stock/list").subscribe
        (
            (data) => //Success
            {
                var jsonResp = JSON.parse(data.text());
                //alert(data.text());
                this.stock = jsonResp.stock;
            }
        );
    }

    /*
    constructor(public http: Http)
    {
        
        
    }
    */

    }

    public requestProductToBeSelled(value: any)
    {

    }


}
