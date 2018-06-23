import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController} from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '../../http-api';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage {
    //@ViewChild('fileInput') fileInput;
    @ViewChild('fileInput') private fileInput: any;

    requestProduct:any;
    stock:any;
    product:any;

    imageURI:any;
    imageFileName:any;

    constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController, public camera: Camera, public modalCtrl: ModalController)
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

    public requestProductToBeSold(value: any)
    {
        let addr: any = "http://localhost:8080/conadmin/requestproduct";
        var jsonArr = {
            "name":"",
            "randValue":0,
            "description":"",
            "amount":0,
            "image":""
        };
        jsonArr.name = value.name;
        jsonArr.randValue = parseInt(value.price);
        jsonArr.description = value.description;
        jsonArr.amount = parseInt(value.amount);
        jsonArr.image = value.image;        

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

    public getPicture() {
        //
        this.presentToast("t");
        //
        if (Camera['installed']()) {
          this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            //
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
            //
          }).then((data) => {
            this.requestProduct.patchValue({ 'image': 'data:image/jpg;base64,' + data });
            
          }, (err) => {
            alert('Unable to take photo');
          })
        } else {     
            //this.click();
            this.fileInput.nativeElement.click();
            /*
            setTimeout(() => {
                this.fileInput.nativeElement = true;
                if (this.fileInput.nativeElement == true)
                    this.fileInput.nativeElement.click();
              }, 3000);
              */

              
            /*
            try{
                this.fileInput.nativeElement.click();
            }
            catch (err)
            {}*/
        }

        return false;
    }

    public processWebImage(event) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
          let imageData = (readerEvent.target as any).result;

          this.presentToast("t: " + imageData);

          imageData = imageData.substring('data:image/jpeg;base64,'.length);
          alert("t2: " + imageData);

          this.requestProduct.patchValue({ 'image': imageData });
        };
    
        reader.readAsDataURL(event.target.files[0]);
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
