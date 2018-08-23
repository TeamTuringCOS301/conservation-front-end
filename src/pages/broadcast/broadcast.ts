import { NavController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController} from 'ionic-angular';
import { Http } from '../../http-api';
import { LoginPage } from '../login/login';

declare var google;

@Component({
  selector: 'page-broadcast',
  templateUrl: 'broadcast.html'
})
export class BroadcastPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  conArea: any;
  polygonPoints: any = [];
  midpoint: any;
  mapObj: any;
  markers: any = [];
  mapMarkers: any = [];
  infoWindows: any = [];
  openMarker: any;

  constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  ionViewDidLoad(){
      this.LoadMap();
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
          alert("Error: " + error);
        }
    );
  }

  displayMarkers(){
    var i = 0;
    for (let entry of this.markers) {
        this.mapMarkers.push(new google.maps.Marker({
        position: entry.location,
        map: this.map,
        title:  '<p><u> '+entry.title+'</u></p>' +
                '<p>Description: '+entry.description+'</p>' +
                '<p>Date & Time: '+new Date(entry.time)+'</p>' +
                '<p>Severity: '+entry.severity+'</p>'
      }));
      if (entry.severity == 0){
        this.mapMarkers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      }
      else if (entry.severity == 1){
        this.mapMarkers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      }
      else{
        this.mapMarkers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/orange-dot.png');
      }
      i++;
    }
    for (let entry of this.mapMarkers) {
      this.closeAllInfoWindows();
      this.addInfoWindowToMarker(entry);
    }
  }

  deleteMarker(){
    this.openMarker.setMap(null);
  }

  clearMarkers(){

  }

  broadcastMarker(){
    return;
  }

  addInfoWindowToMarker(marker) {
    var infoWindowContent = marker.title+'</p>'

    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
      this.openMarker = marker;
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  getMarkers(){
    this.http.get("/alert/list/"+this.conArea+"/0").subscribe
    (
        (data) => //Success1
        {
            var jsonResp = JSON.parse(data.text());
            this.markers = jsonResp.alerts;
            this.displayMarkers();
        },
        (error) =>
        {
          alert("Error: " + error);
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
          alert("Error: " + error);
        }
    );
  }

  showPolygon(){
    this.mapObj = new google.maps.Polygon({
      paths: this.polygonPoints,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000ff',
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
                this.navCtrl.push(LoginPage);
                this.presentToast("Logged Out");
            },
            (error) =>
            {
                this.navCtrl.push(LoginPage);
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
