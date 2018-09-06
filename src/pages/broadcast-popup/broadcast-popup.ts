import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { CONFIG } from '../../app-config';

@Component({
  selector: 'broadcast-popup',
  templateUrl: 'broadcast-popup.html'
})
export class BroadcastPopupPage {
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

        this.alert.isZero = false;
        this.alert.isOne = false;
        this.alert.isTwo = false;

        if (this.alert.severity == '0'){
          this.alert.isZero = true;
        }
        else if (this.alert.severity == '1'){
          this.alert.isOne = true;
        }
        else {
          this.alert.isTwo = true;
        }

        this.alert.image = CONFIG.url + "/alert/image/" + this.alert.id;
    }

    public deleteAlert(){
      this.http.get("/alert/remove/" + this.alert.id).subscribe
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
      this.cancel();
    }

    public requestEditAlert(value: any)
    {
        var jsonArr = {
            "title":"",
            "description":"",
            "severity":0,
            "broadcast":false,
            "location":""
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
        jsonArr.broadcast = this.alert.broadcast;
        jsonArr.location = this.alert.location;

        this.http.post("/alert/update/" + this.alert.id, jsonArr).subscribe
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

        this.requestAlert.reset();
        this.viewCtrl.dismiss(value);
    }

    public cancel()
    {
        this.alert = this.params.get('alert');

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

            this.requestAlert.patchValue({ 'image': imageData });
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
