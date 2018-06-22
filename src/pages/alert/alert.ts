import { NavController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Component, ViewChild, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class AlertPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  polygonPoints: any = [];
  mapObj: any;
  midpoint: any = [];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
      this.LoadMap();
      this.getPolygon()
      this.showPolygon();
      this.setZoom();
      this.getMarkers();
      this.displayMarkers();
  }

  getMarkers(){
    return;
  }

  displayMarkers(){
    return;
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
      //to be replaced with server request here

      this.polygonPoints = [
			{lat: -25.75565, lng: 28.23938},	//to be replaced with server request
			{lat: -25.75392, lng: 28.23217},
			{lat: -25.75136, lng: 28.22908},
			{lat: -25.75565, lng: 28.22479},
			{lat: -25.75654, lng: 28.23114},
			{lat: -25.7623, lng: 28.22973},
			{lat: -25.76424, lng: 28.2375},
        ];

      this.midpoint = {lat: -25.76424, lng: 28.2375};
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
  }

  LoadMap() {
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: {lat: -25.75565, lng: 28.23938},
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
}
