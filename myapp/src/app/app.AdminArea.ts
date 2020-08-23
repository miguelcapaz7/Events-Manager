import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';


const BASE_URL ='http://localhost:1337/';


@Component({
  selector: 'app-root',
  templateUrl: './app.AdminArea.html'
})

export class AdminComponent {
  username:string;
  roles: Array<any> = [];
  token = '';
  name:string;
  _eventsArray: Array<any>;
  _errorMessage:string = "";
  _apiService: ApiService;
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
          console.log(this._eventsArray);
        },

        error => {
          // Let user know about the error.
          this._errorMessage = error;
        });
  }
  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if(sessionStorage.getItem('auth_token')!= null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    else {
      this.token  = '';
    }
  }

  deleteEvent(_id) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      "body": {_id: _id}
    };

    let url = BASE_URL + "Event/Delete";
    this.http.delete(url, httpOptions)
      .subscribe(
        // Data is received from the post request.
        (data) => {
          this._errorMessage = data["errorMessage"];
          this.getAllEvents();
        },
        // An error occurred. Data is not received.
        error => {
          this._errorMessage = error;
        });
  }
  viewAttendees(id){
    this.router.navigate(['/viewAttendees/:' + id]);
  }
}
