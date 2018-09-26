import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UIRouterModule, UIRouter } from "@uirouter/angular";

import { UserService } from './users.service';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    providers: [ UserService ]
})

export class UserComponent {
    displayedColumns = ['name', 'email', 'phoneNumber', 'address'];
    dataSource: any;

    constructor(
        public userService: UserService
    ){
        this.getUserData();
    }

    getUserData() {
        this.userService.getUserData().subscribe((response) => {
            this.dataSource = response;
        }, (err) => {
            console.log(err);
        });
    }

}