import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';

const BASE_URL ='http://localhost:1337/';

@Component({
  selector: 'app-root',
  templateUrl: 'app.register.html'
})
export class RegisterComponent {
  // Hard-code credentials for convenience.
  username: string;
  firstName: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  secureData: string = '';
  reqInfo: any = {};
  _apiService: ApiService;
  errorMessage = '';


  // Since we are using a provider above we can receive
  // an instance through an constructor.
  constructor(private http: HttpClient, router: Router ) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);

  }

  register() {
        // This free online service receives post submissions.
      this.http.post(BASE_URL + 'User/RegisterUser', {

        username: this.username,
        firstName: this.firstName,
        lastName: this.lastname,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      })
        .subscribe(
          // Data is received from the post request.
          (data) => {
            // Inspect the data to know how to parse it.
            console.log(JSON.stringify(data));
          },
          // An error occurred. Data is not received.
          error => {
            this.errorMessage = error;
            console.log(JSON.stringify(error));
          });
    window.location.href = "/login";
    }
  }
