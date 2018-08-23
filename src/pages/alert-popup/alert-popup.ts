import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';

@Component({
  selector: 'alert-popup',
  templateUrl: 'alert-popup.html'
})
export class AlertPopupPage {
    @ViewChild('fileInput') private fileInput: any;

    requestAlert:FormGroup;

    alert:any;

    constructor(public http: Http, public navCtrl: NavController, public toastCtrl: ToastController, public params: NavParams,
         public camera: Camera, public modalCtrl: ModalController, public viewCtrl: ViewController )
    {
        this.requestAlert = new FormGroup({
            title: new FormControl(),
            description: new FormControl(),
            severity: new FormControl(),
            image: new FormControl()
        });

        this.alert = this.params.get('alert');
    }

    public requestAddAlert(value: any)
    {
        var jsonArr = {
            "title":"a",
            "description":"",
            "severity":0,
            "image":""
        };

        if (value == null)
        {
            if (value.title == null || value.description == null || value.severity == null)
            {
                alert("Please complete form.");
                return false;
            }
            alert("Please complete form.");
            return false;
        }

        jsonArr.title = value.title;
        jsonArr.description = value.description;
        jsonArr.severity = parseInt(value.severity);
        jsonArr.broadcast = FALSE;
        jsonArr.location = null;   //////////////////////////

        if (value.image != null)
            jsonArr.image = value.image;

        this.http.post("/alert/add/" + this.product.id, jsonArr).subscribe
        (
            (data) =>
            {
                this.presentToast("Successfully Submitted");
            },
            (error) =>
            {
                this.presentToast("Error: " + error);
            }
        );

        this.requestProduct.reset();
        this.viewCtrl.dismiss(value);
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
