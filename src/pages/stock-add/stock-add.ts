import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController, IonicPage} from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { presentToast, handleError } from '../../app-functions';

@IonicPage({})
@Component({
  selector: 'page-stock-add',
  templateUrl: 'stock-add.html'
})
export class StockAddPage {

    requestProduct:any;
    enableSubmit:boolean = true;
    constructor(public http: Http, public navCtrl: NavController, public toastCtrl: ToastController,
        public camera: Camera, public modalCtrl: ModalController, public viewCtrl: ViewController,
        public ng2ImgToolsService: Ng2ImgToolsService)
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
        else if (value.image == null)
        {
            presentToast(this.toastCtrl, "No image added.");
            return false;
        }
        else
        {
            jsonArr.name = value.name;
            jsonArr.randValue = parseInt(value.price);
            jsonArr.description = value.description;
            jsonArr.amount = parseInt(value.amount);
            jsonArr.image = value.image;

            this.requestProduct.reset();
            this.viewCtrl.dismiss(jsonArr);
        }        
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
