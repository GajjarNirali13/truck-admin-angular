import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TruckInterface } from './truck.interface';

@Injectable()
export class TruckService {
    constructor(private http: HttpClient) { }

    getTruckDetail (sendObj){
        return this.http.post<TruckInterface>('http://192.168.1.28:3000/api/truck', sendObj);
    }

    getTruckData(id) {
        return this.http.get('http://192.168.1.28:3000/api/truck/'+id);
    }

    updateTruckData(id, sendObj) {
        return this.http.put<TruckInterface>('http://192.168.1.28:3000/api/truck/'+id, sendObj);
    }
}