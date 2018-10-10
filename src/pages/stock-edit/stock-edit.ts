import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController, NavParams, IonicPage } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { presentToast, handleError } from '../../app-functions';

@IonicPage({})
@Component({
  selector: 'page-stock-edit',
  templateUrl: 'stock-edit.html'
})
export class StockEditPage {
    @ViewChild('fileInput') private fileInput: any;
    requestProduct:any;

    product:any;

    constructor(public http: Http, public navCtrl: NavController, public toastCtrl: ToastController, public params: NavParams,
         public camera: Camera, public modalCtrl: ModalController, public viewCtrl: ViewController )
    {
        this.requestProduct = new FormGroup({
            name: new FormControl(),
            price: new FormControl(),
            description: new FormControl(),
            amount: new FormControl(),
            image: new FormControl()
        });

        this.product = this.params.get('product');
    }

    public requestEdittedProductToBeSold(value: any)
    {
        var jsonArr = {
            "name":"",
            "randValue":0,
            "description":"",
            "amount":0,
            "image":""
        };

        if (value == null)
        {
            if (value.name == null || value.price == null || value.description == null || value.amount == null)
            {
                presentToast(this.toastCtrl, "Please complete form.");
                return false;
            }
            presentToast(this.toastCtrl,"Please complete form.");
            return false;
        }

        jsonArr.name = value.name;
        jsonArr.randValue = parseInt(value.price);
        jsonArr.description = value.description;
        jsonArr.amount = parseInt(value.amount);

        if (value.image != null)
            jsonArr.image = value.image;

        this.viewCtrl.dismiss(jsonArr);
    }

    public cancel()
    {
        this.product = this.params.get('product');

        this.viewCtrl.dismiss(null);
    }

    public processWebImage(event)
    {
        if (event.target.files[0] == null)
            return false;

        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let imageData = (readerEvent.target as any).result;
            imageData = imageData.substring('data:image/jpeg;base64,'.length);

            this.requestProduct.patchValue({ 'image': imageData });
        };

        reader.readAsDataURL(event.target.files[0]);
    }
}
