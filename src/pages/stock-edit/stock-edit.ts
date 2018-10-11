import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController, NavParams, IonicPage } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { Ng2ImgToolsService } from 'ng2-img-tools';
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
    enableSubmit:boolean = true;
    constructor(public http: Http, public navCtrl: NavController,
        public toastCtrl: ToastController, public params: NavParams,
        public camera: Camera, public modalCtrl: ModalController,
        public viewCtrl: ViewController, public ng2ImgToolsService: Ng2ImgToolsService )
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

        if (value.name == null || value.name == "")
        {   
            presentToast(this.toastCtrl, "Title field is empty.");
            return false;
        }
        else if (value.description == null || value.description == "")
        {
            presentToast(this.toastCtrl, "Description field is empty.");
            return false;
        }
        else if (value.price == null || value.price == 0)
        {
            presentToast(this.toastCtrl, "The given value cannot be 0.");
            return false;
        }
        else if (value.amount == null || value.amount == 0 )
        {
            presentToast(this.toastCtrl, "The given amount cannot be 0.");
            return false;
        }
        else
        {
            jsonArr.name = value.name;
            jsonArr.randValue = parseInt(value.price);
            jsonArr.description = value.description;
            jsonArr.amount = parseInt(value.amount);

            if (value.image != null)
                jsonArr.image = value.image;

            this.viewCtrl.dismiss(jsonArr);
        }
    }

    public cancel()
    {
        this.product = this.params.get('product');

        this.viewCtrl.dismiss(null);
    }

    public processWebImage(event) 
    {
        this.enableSubmit = false;

        if (event.target.files[0] == null)
            return false;
        let reader = new FileReader();
        reader.onload = (readerEvent) => 
        {
            let imageData = (readerEvent.target as any).result;

            var position = imageData.indexOf(",");
            imageData = imageData.slice(position+1);
            this.requestProduct.patchValue({ 'image': imageData });
        };
        this.ng2ImgToolsService.resize([event.target.files[0]], 512, 512).subscribe
        (
            (res) => 
            {
                reader.readAsDataURL(res);
                this.enableSubmit = true;
            }, 
            (error) => 
            {
                handleError(this.navCtrl, error, this.toastCtrl);
                this.enableSubmit = true;
            }
        );
    }
}
