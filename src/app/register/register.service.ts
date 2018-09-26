import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Register } from './register.interface';

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) { }

    createUser(sendObj): Observable<Register> {
        return this.http.post<Register>('http://192.168.1.28:3000/api/user', sendObj);
    }
}