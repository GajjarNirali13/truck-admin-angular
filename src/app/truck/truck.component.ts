import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDataExampleDialog } from '../utilities/alert/alert.component';
import { UIRouterModule, UIRouter } from "@uirouter/angular";

import { TruckService } from './truck.service';

@Component({
    selector: 'truck',
    templateUrl: './truck.component.html',
    styleUrls: ['./truck.component.css'],
    providers: [ TruckService ]
})

export class TruckComponent {
    contact: any;
    truckForm: FormGroup;
    validator: any;
    truck: any;
    userData = JSON.parse(localStorage.getItem('userData'));


    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        public router: UIRouter,
        public truckService: TruckService
    ){
        this.createForm();
        this.getData();
    }

    getData() {
        this.truckService.getTruckData(this.userData.truck).subscribe((response) => {
            this.truck = response;
            this.truckForm = new FormGroup({
                'truckName': new FormControl(this.truck.truckName, Validators.required),
                'truckNo': new FormControl(this.truck.truckNo, Validators.required),
                'truckPhNo': new FormControl(this.truck.truckPhNo, Validators.required),            
                'truckEmail': new FormControl(this.truck.truckEmail, Validators.required)
            });
        }, (err) => {
            this.truck = new TruckDetail('', '', '', '');
            console.log(err);
        });
    }

    createForm() {        
        this.truckForm = new FormGroup({
            'truckName': new FormControl('', Validators.required),
            'truckNo': new FormControl('', Validators.required),
            'truckPhNo': new FormControl('', Validators.required),            
            'truckEmail': new FormControl('', Validators.required)
        });        

        this.truckForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if(!this.truckForm) { return; }
    }

    onSubmit() {
        if (!this.truckForm) {
            return;
        } else {
            var sendObj = {
                "truckNo": this.truckForm.controls.truckNo.value,
                "truckName": this.truckForm.controls.truckName.value,
                "truckPhNo": this.truckForm.controls.truckPhNo.value,
                "truckEmail": this.truckForm.controls.truckEmail.value
            }
            this.truckService.updateTruckData(this.userData.truck, sendObj).subscribe((response) => {
                this.router.stateService.go('menu.truck');
            }, (err) => {
                console.log(err);
            });
        }
    }
}


export class TruckDetail {
    constructor(
        public truckName : string,
        public truckNo: string,
        public truckPhNo: string,
        public truckEmail: string,     
    ) {  }
}