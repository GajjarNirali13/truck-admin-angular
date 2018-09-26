import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { } from '@types/googlemaps';

import { LocationService } from './location.service';


@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css'],
    providers: [ LocationService ]
})

export class LocationComponent {
    currentLat: any;
    currentLong: any;
    marker: any;
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;
    geocoder = new google.maps.Geocoder;
    currentLocation: string;
    
    
    constructor(public locationService: LocationService) {}

    ngOnInit() {
        var mapProp = {
          center: new google.maps.LatLng(18.5793, 73.8143),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }
    

    findMe() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.showPosition(position);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    showPosition(position) {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
    
        let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.panTo(location);
        
    
        if (!this.marker) {
            this.marker = new google.maps.Marker({
                position: location,
                map: this.map,
                title: 'Got you!'
            });
            this.geocodeLatLng(position);
        }
        else {
          this.marker.setPosition(location);
        }
    }
    setData (data) {
        setInterval( () => {
            this.currentLocation = data;
        });        
    }
    geocodeLatLng(geocoder) {
        var temp;
        var coords = geocoder.coords;
        var latlng = {lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude)};
        this.geocoder.geocode({'location': latlng}, function(results, status) {
            if (results[0]) {
                temp = results[0].formatted_address;
            } else {
              window.alert('No results found');
            }          
        });
        setInterval( () => {
            this.currentLocation = temp;
        }); 
    }

    setLocation() {
        var temp = JSON.parse(localStorage.getItem('userData'));
        var x = {
            truckLocation : {
                address: this.currentLocation,
                lat: this.currentLat,
                long: this.currentLong
            }
        };
        this.locationService.updateLocation(temp.truck, x).subscribe( (res)=> {
            alert('Your location has been updated.');
        }, (err) => {
            alert('err');
        })
    }
}