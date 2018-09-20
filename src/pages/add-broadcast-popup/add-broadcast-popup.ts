import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { CONFIG } from '../../app-config';

@IonicPage({})
@Component({
  selector: 'add-broadcast-popup',
  templateUrl: 'add-broadcast-popup.html'
})
export class AddBroadcastPopupPage {
    @ViewChild('fileInput') private fileInput: any;

    requestAlert:FormGroup;

    latlng:any;
    conArea:any;

    constructor(public http: Http, public navCtrl: NavController, public toastCtrl: ToastController, public params: NavParams,
         public camera: Camera, public modalCtrl: ModalController, public viewCtrl: ViewController )
    {
        this.requestAlert = new FormGroup({
            title: new FormControl(),
            description: new FormControl(),
            severity: new FormControl(),
            image: new FormControl()
        });

        this.latlng = this.params.get('latlng');
    }


    public requestAddAlert(value: any)
    {
        var jsonArr = {
            "title":"",
            "description":"",
            "severity":0,
            "broadcast":false,
            "location":"",
            "image":""
        };

        if (value.title == null || value.title == "")
        {
            alert("Title empty, please complete form.");
            return false;
        }
        if (value.description == null || value.description == "")
        {
            alert("Description empty, please complete form.");
            return false;
        }
        if (value.severity == null){
            alert("Severity empty, please complete form.");
            return false;
        }

        jsonArr.title = value.title;
        jsonArr.description = value.description;
        jsonArr.severity = parseInt(value.severity);
        jsonArr.broadcast = true;
        jsonArr.location = this.latlng;

        if (value.image != null)
            jsonArr.image = value.image;

        this.http.get("/admin/info/").subscribe
        (
          (data) => //Success
          {
              var jsonResp = JSON.parse(data.text());
              this.conArea = jsonResp.area;

              this.http.post("/alert/add/" + this.conArea, jsonArr).subscribe
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
          },
          (error) =>
          {
            alert("Error: " + error);
          }
        )

        this.requestAlert.reset();
        this.viewCtrl.dismiss(value);
    }

    public cancel()
    {
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
