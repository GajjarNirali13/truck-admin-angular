import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataExampleDialog } from '../utilities/alert/alert.component';
import { UIRouterModule, UIRouter } from "@uirouter/angular";

import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ LoginService ]
})
export class LoginComponent {
    title: string = "Angular2"
    loginForm: FormGroup;
    validator: any;
    ctrl = new Login('', '');

    
    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        public router: UIRouter,
        public loginService: LoginService
    ){
        this.createForm();
    }

    openDialog() {
        this.dialog.open(DialogDataExampleDialog, {
            data: {
                msg: 'Please enter valid credential.'
            }
        });
    }

    createForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required ],
            password: ['', Validators.required ]
        });

        this.loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if(!this.loginForm) { return; }
    }   

    onSubmit() {     
        //this.router.stateService.go('menu.dashboard');
        if (!this.loginForm) {
            this.openDialog();
            return;
        } else {
            // if (this.loginForm.controls.username.value == "admin" && this.loginForm.controls.password.value == "admin"){
            //     this.router.stateService.go('menu');
            // }
            var sendObj = {
                "userName": this.loginForm.controls.username.value,
                "passWord": this.loginForm.controls.password.value
            }
            this.loginService.authenticateUser(sendObj).subscribe((response) => {
                localStorage.setItem("userData", JSON.stringify(response));
                this.router.stateService.go('menu.dashboard');
            }, (err) => {
                console.log(err);
            });
        }
    }
}


export class Login {
    constructor(
      public username: string,
      public password: string
    ) {  }
}