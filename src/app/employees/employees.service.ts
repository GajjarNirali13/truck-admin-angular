import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EmployeesInterface } from './employees.interface';

@Injectable()
export class EmployeesService {
    constructor(private http: HttpClient) { }

    getEmployeesData(): Observable<EmployeesInterface> {
        var params = {
            type: 'employee'
        }
        return this.http.get<EmployeesInterface>('http://192.168.1.28:3000/api/employees');
    }

    addEmployeeData(sendObj): Observable<EmployeesInterface> {
        return this.http.post<EmployeesInterface>('http://192.168.1.28:3000/api/employee', sendObj);
    }
}