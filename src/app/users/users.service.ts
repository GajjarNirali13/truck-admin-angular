import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserInterface } from './users.interface';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUserData(): Observable<UserInterface> {
        return this.http.get<UserInterface>('http://192.168.1.28:3000/api/users/user');
    }
}