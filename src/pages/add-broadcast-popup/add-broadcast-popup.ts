import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { CONFIG } from '../../app-config';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { presentToast, handleError } from '../../app-functions';

@IonicPage({})
@Component({
  selector: 'add-broadcast-popup',
  templateUrl: 'add-broadcast-popup.html'
})
export class AddBroadcastPopupPage {
    @ViewChild('fileInput') private fileInput: any;

    requestAlert:FormGroup;
    enableSubmit:boolean = true;

    latlng:any;
    conArea:any;

    constructor(public http: Http, public navCtrl: NavController, public toastCtrl: ToastController, public params: NavParams,
         public camera: Camera, public modalCtrl: ModalController, public viewCtrl: ViewController,
         public ng2ImgToolsService: Ng2ImgToolsService )
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
            this.presentToast("Title empty, please complete form.");
            return false;
        }
        if (value.description == null || value.description == "")
        {
            this.presentToast("Description empty, please complete form.");
            return false;
        }
        if (value.severity == null){
            this.presentToast("Severity empty, please complete form.");
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
                      handleError(this.navCtrl, error, this.toastCtrl);
                  }
              );
          },
          (error) =>
          {
            handleError(this.navCtrl, error, this.toastCtrl);
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
        this.enableSubmit = false;

        if (event.target.files[0] == null)
            return false;
        let reader = new FileReader();
        reader.onload = (readerEvent) =>
        {
            let imageData = (readerEvent.target as any).result;

            var position = imageData.indexOf(",");
            imageData = imageData.slice(position+1);
            this.requestAlert.patchValue({ 'image': imageData });
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

    presentToast(text)
    {
        let toast = this.toastCtrl.create(
        {
            message: text,
            duration: 1500,
            position: 'bottom',
            dismissOnPageChange: false
        });
        toast.present();
    }

}
