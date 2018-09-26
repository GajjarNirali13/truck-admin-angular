import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UIRouterModule, UIRouter } from "@uirouter/angular";

import { EmployeesService } from '../employees.service';

@Component({
    selector: 'employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.css'],
    providers: [ EmployeesService ]
})

export class EmployeesListComponent {
    displayedColumns = ['name', 'email', 'phoneNumber', 'address'];
    dataSource: any;

    constructor(
        public employeesService: EmployeesService
    ){
        this.getEmployeeData();
    }

    getEmployeeData() {
        this.employeesService.getEmployeesData().subscribe((response) => {
            this.dataSource = response;
        }, (err) => {
            console.log(err);
        });
    }

}