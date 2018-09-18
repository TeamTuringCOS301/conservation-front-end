import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController} from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { Ng2ImgToolsService } from 'ng2-img-tools';

@Component({
  selector: 'page-stock-add',
  templateUrl: 'stock-add.html'
})
export class StockAddPage {
    @ViewChild('fileInput') private fileInput: any;

    requestProduct:any;

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

        if (value == null)
        {
            if (value.name.length == 0 || value.price == 0 || value.description.length == 0 || value.amount == 0 || value.image == null)
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

    public processWebImage1(event)
    {
        if (event.target.files[0] == null)
            return false;

        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let imageData = (readerEvent.target as any).result;
            var position = imageData.indexOf(",");
            imageData = imageData.slice(position+1);

            this.requestProduct.patchValue({ 'image': imageData });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    public processWebImage(event) {

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
        this.ng2ImgToolsService.resize([event.target.files[0]], 500, 540).subscribe
        (
            (res) => 
            {
                reader.readAsDataURL(res);
            }, 
            (error) => 
            {
                alert("Error" + error);
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
