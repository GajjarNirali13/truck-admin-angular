import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LocationService {
    constructor(private http: HttpClient) { }

    updateLocation(id, obj) {
        return this.http.put('http://192.168.1.28:3000/api/truck/'+id, obj);
    }
}