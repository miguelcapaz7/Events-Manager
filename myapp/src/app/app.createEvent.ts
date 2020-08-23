import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';


const BASE_URL ='http://localhost:1337/';


@Component({
  selector: 'app-root',
  templateUrl: './app.CreateEvent.html'
})

export class CreateEventComponent {
  name: string;
  date: string;
  time: string;
  description: string;
  _http:HttpClient;
  _errorMessage:string;
  _eventsArray: Array<any>;
  _apiService:ApiService;
  router: Router ;


  constructor(private http: HttpClient, router: Router) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
    this.router = router;
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

  createEvent() {
    // This free online service receives post submissions.
    this.http.post(BASE_URL + "Event/CreateEvent",
      {
        name: this.name,
        date: this.date,
        time: this.time,
        description: this.description,
        attendees: Array
      })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log("POST call successful. Inspect response.",
            JSON.stringify(data));
          this._errorMessage = data["errorMessage"];
          this.getAllEvents();
          if (this._errorMessage == '') {
            window.location.href = "/main";
          }
        },
        // An error occurred. Data is not received.
        error => {
          this._errorMessage = error;
        });
  }

}
