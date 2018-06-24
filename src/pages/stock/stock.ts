import { Component, } from '@angular/core';
import { NavController, ToastController, ModalController} from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { LoginPage } from '../login/login';
import { StockAddPage} from '../stock-add/stock-add';
import { StockEditPage} from '../stock-edit/stock-edit';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage {

    requestProduct:any;
    stock:any;
    product:any;
    base64Data:any;

    imageURI:any;
    imageFileName:any;

    constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController, public camera: Camera, public modalCtrl: ModalController)
    {
        this.requestProduct = new FormGroup({
            name: new FormControl(),
            price: new FormControl(),
            description: new FormControl(),
            amount: new FormControl(),
            image: new FormControl()
        });

        this.updateProductList();
    }

    public editProduct(product)
    {
        let addModal = this.modalCtrl.create(StockEditPage, {'product': product});
        addModal.onDidDismiss(gotSomething => {
            if (gotSomething) {
                setTimeout(() => {
                    this.updateProductList();
                }, 1000); 
            }
          })
        addModal.present();
    }

    public addProduct()
    {       
        let addModal = this.modalCtrl.create(StockAddPage);
        addModal.onDidDismiss(gotSomething => {
            if (gotSomething) {
                setTimeout(() => {
                    this.updateProductList();
                }, 1000); 
            }
          })
        addModal.present();
    }

    public logOut()
    {
        this.http.get("/admin/logout").subscribe
        (
            (data) =>
            {
                this.navCtrl.push(LoginPage);
                this.presentToast("Logged Out");
            },
            (error) =>
            {
                this.navCtrl.push(LoginPage);
                //alert("Error: " + error);
            }            
        );        
    }

    public updateProductList()
    {
        this.stock = [];
        this.product = {};
        this.http.get("/reward/list/own").subscribe
        (
            (data) => //Success
            {
                var jsonResp = JSON.parse(data.text());
                this.stock = jsonResp.rewards;
                this.stock.forEach(el =>
                {
                    this.base64Data = el.image;
                    el.image = "data:image/jpeg;base64," + this.base64Data;

                    if (el.verified == false)
                        el.verified = "Not Verified";                        
                    else
                        el.verified = "Verified";
                });                
            }
        );
    }

    public deleteProduct(product)
    {
        this.http.get("/reward/remove/" + product.id).subscribe
        (
            (data) =>
            {
                this.presentToast("Successfully Deleted");
                let index = this.stock.indexOf(product);
                this.stock.splice(index,1);        
            },
            (error) =>
            {
                this.presentToast("Error: " + error);
            }
        );
    }

    presentToast(text)
    {
        let toast = this.toastCtrl.create(
            {
            message: text,
            duration: 1500,
            position: 'bottom',
            dismissOnPageChange: false
            }
        );
        toast.present();
    }


}
