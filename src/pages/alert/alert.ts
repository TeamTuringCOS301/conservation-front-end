import { NavController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController, ModalController} from 'ionic-angular';
import { Http } from '../../http-api';
import { LoginPage } from '../login/login';
import { AlertPopupPage} from '../alert-popup/alert-popup';
import { FormGroup, FormControl} from '@angular/forms';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { presentToast, handleError } from '../../app-functions';
import { Events } from 'ionic-angular';
declare var google;

@IonicPage({})
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class AlertPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  conArea: any;
  polygonPoints: any = [];
  midpoint: any;
  mapObj: any;
  markers: any = [];
  mapMarkers: any = [];
  openMarker: any;
  refreshInterval: any;

  requestAlert:any;

  constructor(public http: Http, public events: Events,  public navCtrl: NavController, public toastCtrl: ToastController, public modalCtrl: ModalController, public popoverCtrl: PopoverController) {
    this.requestAlert = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        severity: new FormControl(),
        image: new FormControl(),
        broadcast: new FormControl()
    });
    events.subscribe('alert:broadcasted', () => {
      console.log('b');
      this.refresh();
    });
  }

  public refresh()
  {
    this.clearAll();
    this.mapMarkers = [];
    this.getMarkers();
  }

  deleteMarker(){
    this.openMarker.setMap(null);
  }

  clearAll(){
      for (let entry of this.mapMarkers){
        this.openMarker = entry;
        this.deleteMarker();
      }
  }

  public editAlert(alert)
  {
    let addModal = this.modalCtrl.create('AlertPopupPage', {'alert': alert});
    addModal.onDidDismiss(newEditedAlert => {
      this.refresh();
      })
    addModal.present();
  }

  ionViewDidLoad(){
      this.LoadMap();
      this.refreshInterval = setInterval(() =>
      {
        this.refresh();
      }, 10000);
  }

  public alertPopup()
  {
      let addModal = this.modalCtrl.create('AlertPopupPage');
      addModal.present();
  }

  getInfo(){
    this.http.get("/admin/info").subscribe
    (
        (data) => //Success
        {
            var jsonResp = JSON.parse(data.text());
            this.conArea = jsonResp.area;
            this.getPolygon();
        },
        (error) =>
        {
          handleError(this.navCtrl, error, this.toastCtrl);
        }
    );
  }

  displayMarkers(){
    var i = 0;
    for (let entry of this.markers) {
      if (!entry.broadcast){
        this.mapMarkers.push(new google.maps.Marker({
        position: entry.location,
        map: this.map,
        title:  entry.title,
        aObject: entry
      }));
      if (entry.severity == 0){
        this.mapMarkers[i].setIcon('https://maps.google.com/mapfiles/ms/icons/green-dot.png');
      }
      else if (entry.severity == 1){
        this.mapMarkers[i].setIcon('https://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      }
      else{
        this.mapMarkers[i].setIcon('https://maps.google.com/mapfiles/ms/icons/orange-dot.png');
      }
      i++;
    }}

    for (let entry of this.mapMarkers) {
      this.addListenerToMarker(entry);
    }
  }

  addListenerToMarker(marker) {
    marker.addListener('click', () => {
      this.openMarker = marker;
      this.openMarker.aObject.time = new Date(this.openMarker.aObject.time).toString();
      this.editAlert(this.openMarker.aObject);
    });
  }

  getMarkers(){
    this.http.get("/alert/list/"+this.conArea+"/0").subscribe
    (
        (data) => //Success
        {
            var jsonResp = JSON.parse(data.text());
            this.markers = jsonResp.alerts;
            this.displayMarkers();
        },
        (error) =>
        {
          handleError(this.navCtrl, error, this.toastCtrl);
        }
    );
  }

  setZoom(){
    google.maps.Polygon.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      var paths = this.getPaths();
      var path;
      for (var i = 0; i < paths.getLength(); i++) {
        path = paths.getAt(i);
        for (var ii = 0; ii < path.getLength(); ii++) {
          bounds.extend(path.getAt(ii));
        }
      }
      return bounds;
    }
    this.map.fitBounds(this.mapObj.getBounds());
  }

  getPolygon(){

    this.http.get("/area/info/"+this.conArea).subscribe
    (
        (data) => //Success
        {
            var jsonResp = JSON.parse(data.text());
            this.polygonPoints = jsonResp.border;
            this.midpoint = jsonResp.middle;
            this.showPolygon();
        },
        (error) =>
        {
          handleError(this.navCtrl, error, this.toastCtrl);
        }
    );
  }

  showPolygon(){
    this.mapObj = new google.maps.Polygon({
      paths: this.polygonPoints,
      strokeColor: '#6c7bfe',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#6c7bfe',
      fillOpacity: 0.2,
    });
    this.mapObj.setMap(this.map);

    this.map.setCenter(this.midpoint);
    this.setZoom();
    this.getMarkers();
  }

  LoadMap() {
    let mapOptions = {
      center: {lat: -25.75565, lng: 28.23938},
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getInfo();
  }

  public logOut()
  {
      this.http.get("/admin/logout").subscribe
      (
          (data) =>
          {
              let elements = document.querySelectorAll(".tabbar");

              if (elements != null) {
                  Object.keys(elements).map((key) => {
                      elements[key].style.display = 'none';
                  });
              }
              this.navCtrl.push('LoginPage');
              this.presentToast("Logged Out");
          },
          (error) =>
          {
              handleError(this.navCtrl, error, this.toastCtrl);
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

    public presentPopover(myEvent) {
      let popover = this.popoverCtrl.create('PopoverPage');
      popover.present({
          ev: myEvent
      });
      popover.onDidDismiss(data =>
      {
          if (data == null)
              return;
          else if (data.option == 1)
              this.refresh();
          else if (data.option == 2)
              this.logOut();

      })
  }
}
