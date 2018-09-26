import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UIRouterModule, UIRouter } from "@uirouter/angular";

import { EmployeesService } from '../employees.service';

@Component({
    selector: 'manage-employees',
    templateUrl: './manage-employees.component.html',
    styleUrls: ['./manage-employees.component.css'],
    providers: [ EmployeesService ]
})


export class ManageEmployeesComponent {
    employeeForm: FormGroup;
    truckId: any = JSON.parse(localStorage.getItem('userData'));

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        public router: UIRouter,
        public employeesService: EmployeesService
    ){
        this.createForm();
    }

    createForm() {
        this.employeeForm = this.fb.group({
            name: ['', Validators.required ],
            email: ['', Validators.required ],
            passWord: ['', Validators.required ],
            userName: ['', Validators.required ],
            phoneNumber: ['', Validators.required ],
            address: ['', Validators.required ],
            type: ['', Validators.required ]
        });

        this.employeeForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if(!this.employeeForm) { return; }
    }   

    onSubmit(){
        if (!this.employeeForm) {
            return;
        } else {
            var sendObj = {
                "name": this.employeeForm.controls.name.value,
                "email": this.employeeForm.controls.email.value,
                "passWord": this.employeeForm.controls.passWord.value,
                "userName": this.employeeForm.controls.userName.value,
                "phoneNumber": this.employeeForm.controls.phoneNumber.value,
                "address": this.employeeForm.controls.address.value,
                "type": this.employeeForm.controls.type.value,
                "truckId": this.truckId.truck
            }
            this.employeesService.addEmployeeData(sendObj).subscribe((response) => {
                this.router.stateService.go('menu.employees-list');
            }, (err) => {
                console.log(err);
            });
        }
    }
}