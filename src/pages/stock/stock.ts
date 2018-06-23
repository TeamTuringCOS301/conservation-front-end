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
    base64Data:any;

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

        this.updateProductList();
    }

    public updateProductList()
    {
        this.stock = [];
        this.product = {};
        this.http.get("/reward/list/own").subscribe
        (
            (data) => //Success
            {
                var jsonResp = JSON.parse(data.text());
                this.stock = jsonResp.rewards;
                this.stock.forEach(el =>
                {
                    this.base64Data = el.image;
                    el.image = "data:image/jpeg;base64," + this.base64Data;
                });                
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
            }
        );

        this.requestProduct.reset();

        setTimeout(() => {
            this.updateProductList();
        }, 1000);       
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

    public processWebImage(event)
    {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let imageData = (readerEvent.target as any).result;
            imageData = imageData.substring('data:image/jpeg;base64,'.length);

            this.requestProduct.patchValue({ 'image': imageData });
        };
    
        reader.readAsDataURL(event.target.files[0]);
    }

    public deleteProduct(product)
    {
        let index = this.stock.indexOf(product);
        this.stock.splice(index,1);

        this.http.get("/reward/remove/" + product.id).subscribe
        (
            (data) =>
            {
                this.presentToast("Successfully Deleted");
            },
            (error) =>
            {
                this.presentToast("Error: " + error);
            }
        );

        //this.updateProductList();
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
