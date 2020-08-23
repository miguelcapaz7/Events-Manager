import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';
import { AppComponent } from './app.component';
import {routing} from './app.routing';
import {RegisterComponent} from './app.register';
import {LoginComponent} from './app.login';
import {MainComponent} from './app.main';
import { LogoutComponent }        from './app.logout';
import { MyEventsComponent}        from './app.myEvents';
import { CreateEventComponent}        from './app.createEvent';
import { AdminComponent}        from './app.AdminArea';
import {ViewAttendeesComponent} from "./app.viewAttendees";



@NgModule({
  declarations: [
    AppComponent, RegisterComponent, LoginComponent, MainComponent, LogoutComponent, ViewAttendeesComponent,
    MyEventsComponent, CreateEventComponent, AdminComponent],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
