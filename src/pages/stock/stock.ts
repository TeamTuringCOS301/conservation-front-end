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
                this.stock = jsonResp.rewards;
                this.stock.forEach(el => {
                    
                    alert("el.name: " + " p " + el.image);
                    
                    let dataBlob = this.getBlob(el.image);
                    let urlCreator = window.URL; // || window.webkitURL;                    
                    let imageUrl = urlCreator.createObjectURL(dataBlob);

                    el.image = imageUrl;
                    
                    alert("el.name: " + " o " + el.image); //    blob:http://localhost:8100/ hex...
                });
                
            }
        );
    }

    public getBlob (b64Data)
    {
        let contentType = '';
        let sliceSize = 512;

        b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize);
    
          let byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
    
          let byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
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

        this.http.post("/reward/remove/" + product.id, null).subscribe
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
