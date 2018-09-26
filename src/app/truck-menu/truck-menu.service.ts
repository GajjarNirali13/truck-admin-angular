import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TruckMenuService {
    constructor(private http: HttpClient) { }

    addMenu(sendObj) {
        return this.http.post('http://192.168.1.28:3000/api/menu', sendObj);
    }

    getMenuData(truckId) {
        return this.http.get('http://192.168.1.28:3000/api/menu/' + truckId);
    }
}