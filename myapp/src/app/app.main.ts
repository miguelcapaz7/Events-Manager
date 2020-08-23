import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';


const BASE_URL = 'http://localhost:1337/';


@Component({
  selector: 'app-root',
  templateUrl: './app.main.html'
})

export class MainComponent {
  username              = '';
  email                 = "";
  firstName             = '';
  lastName              = '';
  message: string;
  roles: Array<any>      = [];
  token                 = '';
  name             = '';
  _eventsArray       : Array<any>;
  _errorMessage:string ="";
  _apiService:ApiService;
  router: Router ;


  constructor(private http: HttpClient, router: Router) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
    this.router = router;
    this.showContentIfLoggedIn();
    this.getAllEvents();

  }
  getAllEvents() {
    let url = BASE_URL + 'Event/Index';
    this.http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
          this._eventsArray = result.events;
        },

        error => {
          // Let user know about the error.
          this._errorMessage = error;
        });
  }

  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if (sessionStorage.getItem('auth_token')!= null) {
      this.token   = sessionStorage.getItem('auth_token');
      this.username = sessionStorage.getItem('username');
      this.email = sessionStorage.getItem('email');
      this.firstName = sessionStorage.getItem('FirstName');
      this.lastName = sessionStorage.getItem('LastName');
    } else {
      this.token   = '';
    }
  }

  attendEvent(_id, attendees, name) {
    if (this.token === '') {
      this.router.navigate(['/login']);
    } else {
      if (this.evaluateperson(attendees) != true) {
        this.http.post(BASE_URL + "Event/Update",
          {
            _id: _id,
            username: this.username.slice(1, -1),
            email: this.email.slice(1, -1),
            firstName: this.firstName.slice(1, -1),
            lastName: this.lastName.slice(1, -1)
          })
          .subscribe(
            // Data is received from the post request.
            (data) => {
              // Inspect the data to know how to parse it.
              console.log("POST call successful. Inspect response.",
                JSON.stringify(data));
              this._errorMessage = data["errorMessage"];
              this.getAllEvents();

            },
            // An error occurred. Data is not received.
            error => {
              this._errorMessage = error;
              // tslint:disable-next-line:align
            });
          window.location.href = "/myEvents"
      } else {
        this.message = "You are already attending: " + name;
      }
    }
  }

  evaluateperson(attendees) {
    for (let i = 0; i < attendees.length; i++) {
      if (this.email.slice(1, -1) == attendees[i].email) {
        return true;
      }
    }
  }
}

