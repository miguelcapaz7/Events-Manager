import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { RegisterComponent }        from './app.register';
import { LoginComponent }        from './app.login';
import { MainComponent }        from './app.main';
import { LogoutComponent }        from './app.logout';
import { MyEventsComponent } from "./app.myEvents";
import { CreateEventComponent } from "./app.createEvent";
import { AdminComponent }        from './app.AdminArea';
import { ViewAttendeesComponent } from "./app.viewAttendees";

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'myEvents', component: MyEventsComponent },
  { path: 'createEvent', component: CreateEventComponent },
  { path: 'AdminArea', component: AdminComponent },
  { path: 'viewAttendees/:id', component: ViewAttendeesComponent},
  { path: '', redirectTo: '', pathMatch: 'full' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
