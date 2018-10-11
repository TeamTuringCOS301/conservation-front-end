import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { CONFIG } from '../../app-config';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { presentToast, handleError } from '../../app-functions';

@IonicPage({})
@Component({
  selector: 'alert-popup',
  templateUrl: 'alert-popup.html'
})
export class AlertPopupPage {
    @ViewChild('fileInput') private fileInput: any;

    requestAlert:FormGroup;
    enableSubmit:boolean = true;

    alert:any;

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
              this.cancel();
          },
          (error) =>
          {
              handleError(this.navCtrl, error, this.toastCtrl);
              this.cancel();
          }
      );
      //this.cancel();
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
            jsonArr.severity = this.alert.severity;
        }
        else{
          jsonArr.severity = parseInt(value.severity);
        }

        jsonArr.title = value.title;
        jsonArr.description = value.description;
        jsonArr.broadcast = true;
        jsonArr.location = this.alert.location;

        this.http.post("/alert/update/" + this.alert.id, jsonArr).subscribe
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
        }
        );
        toast.present();
    }

}
