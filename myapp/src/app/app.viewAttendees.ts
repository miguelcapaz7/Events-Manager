import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

const BASE_URL = 'http://localhost:1337/';


@Component({
  selector: 'app-root',
  templateUrl: './app.viewAttendees.html'
})

export class ViewAttendeesComponent {
  linkID: string;
  objID: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<any> = [];
  token = '';
  message = 'Not logged in.';
  _eventsArray: Array<any>;
  _errorMessage:string;
  _apiService: ApiService;
  router: Router ;

  constructor(private http: HttpClient, router: Router, private route: ActivatedRoute) {
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
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
      this.username = sessionStorage.getItem('username');
      this.email = sessionStorage.getItem('email');
      this.firstName = sessionStorage.getItem('FirstName');
      this.lastName = sessionStorage.getItem('LastName');
      this.message = 'You are now logged in.';
    } else {
      this.message = 'Not logged in.';
      this.token = '';
    }
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.linkID = id;
      this.objID = this.linkID.slice(1);
    });
  }
}
