import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UIRouterModule, UIRouter } from "@uirouter/angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { reject } from 'q';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'


import { AppComponent } from './app.component';
import { DialogDataExampleDialog } from './utilities/alert/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { ManageNotesComponent } from './notes/manage-notes/manage-notes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TruckComponent } from './truck/truck.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { ManageEmployeesComponent } from './employees/manage-employees/manage-employees.component';
import { UserComponent } from './users/users.component';
import { LocationComponent } from './location/location.component';
import { TruckMenuComponent } from './truck-menu/truck-menu.component';

import { routeAry } from './app.state';
let stateAry = routeAry;

@NgModule({
    declarations: [
        AppComponent,
        DialogDataExampleDialog,
        LoginComponent,
        RegisterComponent,
        MenuComponent,
        AboutComponent,
        NotesListComponent,
        DashboardComponent,
        TruckComponent,
        EmployeesListComponent,
        ManageEmployeesComponent,
        ManageNotesComponent,
        UserComponent,
        LocationComponent,
        TruckMenuComponent
    ],
    entryComponents: [ DialogDataExampleDialog ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
        MatDialogModule, MatTableModule, MatIconModule, MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        Angular2FontawesomeModule,
        HttpClientModule,
        NgbModule.forRoot(),
        UIRouterModule.forRoot({ states: stateAry, useHash: true, config: uiRouterConfigFn })
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})

export class AppModule {}

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter) {    
    // If no URL matches, go to the 'hello' state by default
    router.urlService.rules.otherwise({ state: 'login' });
}