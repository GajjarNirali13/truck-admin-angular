import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


import { TruckMenuService } from './truck-menu.service';

@Component({
    selector: 'truck-menu',
    templateUrl: './truck-menu.component.html',
    styleUrls: ['./truck-menu.component.css'],
    providers: [ TruckMenuService ]
})
export class TruckMenuComponent {
    nodes: any;
    truck : any = JSON.parse(localStorage.getItem('userData'));


    constructor(public truckMenuService: TruckMenuService) {
        // this.nodes = [
        //     {
        //         id: 0,
        //         name: 'root0',
        //         value: '',
        //         children: [
        //             { id: 0, name: 'child0', value: '', price: ''}
        //         ]
        //     }
        // ];    
        this.getMenu()   
    }

    getMenu() {
        this.truckMenuService.getMenuData(this.truck.truck).subscribe( (res) => {
            this.setAPINodes(res[0]['menu']);
        }, (err) => {
            this.setDefaultNodes();
        });
    }

    setAPINodes(res) {
        this.nodes = [];        
        for (var i = 0; i < res.length; i++) {    
            var temp = {
                id: i,
                name: 'root'+i,
                value: res[i].mainItem,
                children: []
            };
            for (var j = 0; j < res[i].subItem.length; j++) {
                var tempj = {
                    id: j, 
                    name: 'child'+j, 
                    value: res[i].subItem[j].item, 
                    price: res[i].subItem[j].price
                }
                temp.children.push(tempj);
            }
            this.nodes.push(temp)
        }
    }

    setDefaultNodes() {
        this.nodes = [
            {
                id: 0,
                name: 'root0',
                value: '',
                children: [
                    { id: 0, name: 'child0', value: '', price: ''}
                ]
            }
        ];
    }
    
    
    addParent (index) {
        console.log(index)
        if (!this.nodes[index].value) {
            return;
        }
        this.nodes.push({
            id: index+1,
            name: 'root'+(index+1),
            value: '',
            children: [
                { id: 0, name: 'child0', value: '', price: ''}
            ]
        });
    }

    addChild(parentIndex, node, index) {
        if (!this.nodes[parentIndex].children[index].value) {
            return;
        }
        this.nodes[parentIndex].children.push({
            id:index+1, name: 'child'+(index+1), value: '', price: '' 
        });
    }

    delParent (index) {
        if (index == 0) {
            return;
        }
        this.nodes.splice(index, 1);
    }

    delChild(parentIndex, index) {
        if (index == 0) {
            return;
        }
        this.nodes[parentIndex].children.splice(index, 1);
    }

    submit() {
        var sendAryObj = [];
        for (var i = 0; i < this.nodes.length; i++) {
            var sendObj = {};
            sendObj['mainItem'] = this.nodes[i].value;
            sendObj['subItem'] = [];
            for (var j=0; j< this.nodes[i].children.length; j++) {
                sendObj['subItem'].push({
                    'item': this.nodes[i].children[j].value,
                    'price': this.nodes[i].children[j].price
                });
            }
            sendAryObj.push(sendObj);
        }
        
        var temp = {
            'menu': sendAryObj,
            'truckId': this.truck.truck
        };
        console.log(temp);
        this.truckMenuService.addMenu(temp).subscribe( (response) => {
            alert('sucess')
        }, (error) => {
            alert('error')
        });
    }
}
