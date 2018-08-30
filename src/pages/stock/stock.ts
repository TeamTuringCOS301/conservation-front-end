import { Component, } from '@angular/core';
import { NavController, ToastController, ModalController, AlertController} from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { LoginPage } from '../login/login';
import { StockAddPage} from '../stock-add/stock-add';
import { StockEditPage} from '../stock-edit/stock-edit';
import { CONFIG } from '../../app-config';

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
    imageTag:any;

    constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController,
         public camera: Camera, public modalCtrl: ModalController, private alertCtrl: AlertController)
    {
        this.requestProduct = new FormGroup({
            name: new FormControl(),
            price: new FormControl(),
            description: new FormControl(),
            amount: new FormControl(),
            image: new FormControl()
        });

        this.imageTag = 0;
        this.updateProductList();
    }

    public editProduct(product)
    {
        let addModal = this.modalCtrl.create(StockEditPage, {'product': product});
        addModal.onDidDismiss(result => {
            if (result)
            {
                this.http.post("/reward/update/" + product.id, result).subscribe
                (
                    (data) =>
                    {
                        this.presentToast("Successfully Submitted");
                        this.imageTag += 1;
                        this.updateProductList();
                    },
                    (error) =>
                    {
                        this.presentToast("Error: " + error);
                    }
                );
            }
        });
        addModal.present();
    }

    public addProduct()
    {               
        let addModal = this.modalCtrl.create(StockAddPage);
        addModal.onDidDismiss(result => {
            if (result) {                        
                this.http.post("/reward/add", result).subscribe
                (
                    (data) =>
                    {
                        this.presentToast("Successfully Submitted");
                        this.updateProductList();
                    },
                    (error) =>
                    {
                        this.presentToast("Error: " + error);
                    }
                );            
            }
        });
        addModal.present();
    }

    public refresh()
    {
        this.updateProductList();
    }

    public logOut()
    {
        this.http.get("/admin/logout").subscribe
        (
            (data) =>
            {
                let elements = document.querySelectorAll(".tabbar");

                if (elements != null) {
                    Object.keys(elements).map((key) => {
                        elements[key].style.display = 'none';
                    });
                }
                this.navCtrl.push(LoginPage);
                this.presentToast("Logged Out");
            },
            (error) =>
            {
                alert("Error: " + error);
            }            
        );        
    }

    public updateProductList()
    {
        this.stock = [];
        this.product = {};
        this.http.get("/reward/list/own").subscribe
        (
            (data) => 
            {
                var jsonResp = JSON.parse(data.text());
                this.stock = jsonResp.rewards;
                this.stock.forEach(el =>
                {
                    el.image = CONFIG.url + "/reward/image/" + el.id + "?" + this.imageTag;

                    if (el.verified == false)
                        el.verified = "Not Verified";                        
                    else
                        el.verified = "Verified";
                });                
            },
            (error) =>
            {
                alert("Error" + error);
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

    public presentDeleteConfirm(product) {
        let alert = this.alertCtrl.create({
            title: 'Delete',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {                    
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.deleteProduct(product);
                    }
                }
            ]
        });
        alert.present();
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
