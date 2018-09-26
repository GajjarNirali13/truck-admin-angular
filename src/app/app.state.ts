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


import { TruckService } from './truck/truck.service';


var loginState = { name: 'login', url: '/login',  component: LoginComponent}; 
var registerState = { name: 'register', url: '/register',  component: RegisterComponent}; 
var menuState = { name: 'menu', url: '/menu', component: MenuComponent };
var noteListState = { name: 'menu.note-list', url: '/note-list',  component: NotesListComponent}; 
var ManageNoteState = { name: 'menu.manage-note', url: '/manage-note',  component: ManageNotesComponent}; 
var aboutState = { name: 'menu.about', url: '/about',  component: AboutComponent}; 
var dashboardState = { name: 'menu.dashboard', url: '/dashboard',  component: DashboardComponent}; 
var truckState = { name: 'menu.truck', url: '/truck',  component: TruckComponent}; 
var employeesListState = { name: 'menu.employees-list', url: '/employees-list',  component: EmployeesListComponent}; 
var ManageEmployeesState = { name: 'menu.manage-employees', url: '/manage-employees',  component: ManageEmployeesComponent}; 
var UserState = { name: 'menu.user', url: '/user',  component: UserComponent}; 
var LocationState = { name: 'menu.location', url: '/location',  component: LocationComponent}; 
var TruckMenuState = { name: 'menu.truck-menu', url: '/truck-menu',  component: TruckMenuComponent}; 



export const routeAry =  [
    loginState,
    registerState,
    menuState,
    noteListState,
    ManageNoteState,
    aboutState,
    dashboardState,
    truckState,
    employeesListState,
    ManageEmployeesState,
    UserState,
    LocationState,
    TruckMenuState
];