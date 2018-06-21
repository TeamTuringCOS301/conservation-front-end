import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

    constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController, public camera: Camera) 
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
        var jsonArr: any = {};
        jsonArr.location = "";
        var param = JSON.stringify(jsonArr);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers, withCredentials: true});
        var addr = "http://localhost:8080/stock/list";        
        this.http.get(addr).subscribe
        (
            (data) => //Success
            {
                var jsonResp = JSON.parse(data.text());
                //alert(data.text());
                this.stock = jsonResp.stock;
            }
        );


        // testing
        var test = new
    }

    public requestProductToBeSolled(value: any)
    {
        let addr: any = "http://localhost:8080/conadmin/requestproduct";
        var jsonArr = {
            "name":"",
            "price":"",
            "description":"",
            "amount":"",
            "image":""
        };
        jsonArr.name = value.name;
        jsonArr.price = value.price;
        jsonArr.description = value.description;
        jsonArr.amount = value.amount;
        jsonArr.image = this.imageURI;
        
        var param = jsonArr;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers/*, withCredentials: true*/});
        this.http.post(addr, param, options).subscribe
        (
            (data) =>
            {
                var jsonResp = JSON.parse(data.text());
                if(jsonResp.success)
                {
                    //this.presentToast("Successfully Submitted");
                }
            },
            (error) =>
            {
                alert("Error: " + error);
            }
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
        }, (err) => {
            // Handle error
        });
    }


}
