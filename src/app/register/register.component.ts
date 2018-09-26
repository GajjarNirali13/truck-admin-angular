import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataExampleDialog } from '../utilities/alert/alert.component';
import { UIRouterModule, UIRouter } from "@uirouter/angular";

import { RegisterService } from './register.service';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [ RegisterService ]
})
export class RegisterComponent {
    registerForm: FormGroup;
    validator: any;
    ctrl = new Register('', '', '', '', '', '');

    config = {
        "username": {
          required: { name: "username" }
        },
        "password": {
            required: { name: "password" }
        },"name": {
            required: { name: "password" }
        },"email": {
            required: { name: "password" }
        },"phno": {
            required: { name: "password" }
        }
    };

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        public router: UIRouter,
        public registerService: RegisterService
    ){
        this.createForm();
    }

    openDialog() {
        this.dialog.open(DialogDataExampleDialog, {
            data: {
                msg: 'Please enter valid data.'
            }
        });
    }

    createForm() {
        this.registerForm = this.fb.group({
            username: ['', Validators.required ],
            password: ['', Validators.required ],
            name: ['', Validators.required ],
            email: ['', Validators.required ],
            phno: ['', Validators.required ],
            address: [ ]
        });

        this.registerForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if(!this.registerForm) { return; }
    }   

    onSubmit() {        
        if (!this.registerForm) {
            this.openDialog();
            return;
        } else {
            var sendData = {
                "userName": this.registerForm.controls.username.value,
                "passWord": this.registerForm.controls.password.value,
                "name": this.registerForm.controls.name.value,
                "email": this.registerForm.controls.email.value,
                "phoneNumber": this.registerForm.controls.phno.value,
                "address": this.registerForm.controls.address.value
            };
            this.registerService.createUser(sendData).subscribe((response) => {
                this.router.stateService.go('login');
            }, (err) => {
                console.log(err);
            });            
        }
    }
}


export class Register {
    constructor(
        public name: string,
        public email: string,
        public phno: string,
        public address: string,
        public username: string,
        public password: string
    ) {  }
}