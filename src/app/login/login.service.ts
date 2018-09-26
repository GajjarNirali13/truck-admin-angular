import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Login } from './login.interface';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    authenticateUser(sendObj): Observable<Login> {
        return this.http.post<Login>('http://192.168.1.28:3000/api/employee/authenticate', sendObj);
    }
}