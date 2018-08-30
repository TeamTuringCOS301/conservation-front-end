import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController} from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';

@Component({
  selector: 'page-stock-add',
  templateUrl: 'stock-add.html'
})
export class StockAddPage {
    @ViewChild('fileInput') private fileInput: any;

    requestProduct:any;

    constructor(public http: Http, public navCtrl: NavController, public toastCtrl: ToastController,
        public camera: Camera, public modalCtrl: ModalController, public viewCtrl: ViewController)
    {
        this.requestProduct = new FormGroup({
            name: new FormControl(),
            price: new FormControl(),
            description: new FormControl(),
            amount: new FormControl(),
            image: new FormControl()
        });
    }

    public cancel()
    {
        this.viewCtrl.dismiss(null);     
    }

    public requestProductToBeSold(value: any)
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
            if (value.name == null || value.price == null || value.description == null || value.amount == null || value.image == null)
            {
                alert("Please complete form.");
                return false;
            }
            alert("Please complete form.");
            return false;
        }
        
        jsonArr.name = value.name;
        jsonArr.randValue = parseInt(value.price);
        jsonArr.description = value.description;
        jsonArr.amount = parseInt(value.amount);
        jsonArr.image = value.image;        

        this.requestProduct.reset();
        this.viewCtrl.dismiss(jsonArr);
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