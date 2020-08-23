import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';

const BASE_URL = 'http://localhost:1337/';

@Component({
  selector: 'app-root',
  templateUrl: 'app.myEvents.html'
})
export class MyEventsComponent {
  roles: string;
  username:string;
  firstName:string;
  lastName:string;
  token = '';
  email: string;
  message = 'Not logged in.';
  _eventsArray: Array<any>;
  _errorMessage:string;
  _apiService: ApiService;
  router: Router;

  // Since we are using a provider above we can receive
  // an instance through an constructor.

  constructor(private http: HttpClient, router: Router) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
    this.router = router;
    this.showContentIfLoggedIn();
    this.getAllEvents();
  }

  getAllEvents() {
    const url = BASE_URL + 'Event/Index';
    this.http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
          this._eventsArray = result.events;
          console.log(this._eventsArray);
        },

        error => {
          // Let user know about the error.
          this._errorMessage = error;
        });
  }

  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
      this.username = sessionStorage.getItem('username');
      this.roles = sessionStorage.getItem('roles');
      this.email = sessionStorage.getItem('email').slice(1, -1);
      this.message = 'The user has been logged in.';
    } else {
      this.message = 'Not logged in.';
      this.token = '';
      this.username = '';
    }
  }

  unattendEvent(_id) {
    this.http.post(BASE_URL + 'Event/UnAttendEvent',
      {
        _id: _id,
        firstName: this.firstName.slice(1, -1),
        lastName: this.lastName.slice(1, -1),
        email: this.email.slice(1, -1)
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
        });
    window.location.href = '/main';
  }
}

