import { Component } from '@angular/core';
import { UIRouterModule, UIRouter } from "@uirouter/angular";

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    constructor( public router: UIRouter ) {}

    goToDashboard() {
        this.router.stateService.go('menu.dashboard');
    }
}
