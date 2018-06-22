import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { ImagePicker } from '@ionic-native/image-picker';
import { GalleryPage } from '../gallery/gallery';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage {

    requestProduct:any;
    stock:any;
    product:any;

    imageURI:any;
    imageFileName:any;

    constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController, public camera: Camera, public imagePicker: ImagePicker)
    {
        this.requestProduct = new FormGroup({
            name: new FormControl(),
            price: new FormControl(),
            description: new FormControl(),
            amount: new FormControl(),
            image: new FormControl()//this.imageURI
        });

        this.stock = [];
        this.product = {};
        this.http.get("/reward/list/own").subscribe
        (
            (data) => //Success
            {
                var jsonResp = JSON.parse(data.text());
                //alert(data.text());
                this.stock = jsonResp.rewards;
            }
        );
    }

    public requestProductToBeSolled(value: any)
    {
        let addr: any = "http://localhost:8080/conadmin/requestproduct";
        var jsonArr = {
            "name":"",
            "price":0,
            "description":"",
            "amount":0,
            "image":""
        };
        jsonArr.name = value.name;
        jsonArr.price = value.price;
        jsonArr.description = value.description;
        jsonArr.amount = value.amount;
        jsonArr.image = this.imageURI;        

        this.http.post("/reward/add", jsonArr).subscribe
        (
            (data) =>
            {
                this.presentToast("Successfully Submitted");
            },
            (error) =>
            {
                this.presentToast("Error: " + error);
                alert("Error: " + error);
            }
        );
    }

    public openGallery (): void {
        let options = {
          maximumImagesCount: 1,
          width: 500,
          height: 500,
          quality: 75
        }
      
        ImagePicker.getPictures(options).then(
          file_uris => this._navCtrl.push(GalleryPage, {images: file_uris}),
          err => console.log('uh oh')
        );
      }



    
    public getImage()
    {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }

        this.camera.getPicture(options).then((imageData) => {
            //let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.imageURI = imageData;
            this.presentToast(this.imageURI);
            this.presentToast("ok");
        }, (err) => {
            // Handle error
            this.presentToast("Fail to load image: " + err);
            this.imageURI = "jnasnansjknsjnajd";
        });
        
        return false;
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
