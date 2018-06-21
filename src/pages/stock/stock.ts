import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { FormGroup, FormControl} from '@angular/forms';

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
        var jsonArr: any = {};
        jsonArr.location = "";
        var param = JSON.stringify(jsonArr);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        /*

        let options = new RequestOptions({headers: headers, withCredentials: true});
        var addr = "http://localhost:8080/stock/list";
        this.http.get(addr).subscribe
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