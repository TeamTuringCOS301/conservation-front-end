import { NavController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
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
  midpoint: any;
  mapObj: any;
  markers: any = [];
  mapMarkers: any = [];
  infoWindows: any = [];
  openMarker: any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
      this.LoadMap();
      this.getPolygon();
      this.showPolygon();
      this.setZoom();
      this.getMarkers();
      this.displayMarkers();
  }

  displayMarkers(){
    var i = 0;
    for (let entry of this.markers) {
        this.mapMarkers.push(new google.maps.Marker({
        position: entry.location,
        map: this.map,
        title:  '<p>Description: '+entry.description+'</p>' +
                '<p>Date: '+entry.date+'</p>' +
                '<p>Time: '+entry.time+'</p>' +
                '<p>Severity: '+entry.severity+'</p>' +
                '<p><button click="AlertPage.deleteMarker()"> Delete </button></p>' +
                '<p><button click="AlertPage.broadcastMarker()"> Broadcast </button></p>'
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
    this.markers = [{description: "Darius Spotted", location: {lat: -25.75592, lng: 28.23217}, date: "20/09/2018", time: "19:40", broadcasted: false, severity: 0},
                    {description: "Darius Spotted", location: {lat: -25.75392, lng: 28.22917}, date: "20/09/2018", time: "19:40", broadcasted: true, severity: 1},
                    {description: "Rhino's Mating", location: {lat: -25.7613, lng: 28.23573}, date: "21/09/2018", time: "19:30", broadcasted: false, severity: 2},
                    {description: "Endangered Darius attacked Elephant", location: {lat: -25.75765, lng: 28.23338}, date: "24/09/2018", time: "19:10", broadcasted: false, severity: 1},
                    {description: "The beast is released", location: {lat: -25.76124, lng: 28.2305}, date: "29/09/2018", time: "19:15", broadcasted: true, severity: 0}]
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
    let mapOptions = {
      center: {lat: -25.75565, lng: 28.23938},
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
}
