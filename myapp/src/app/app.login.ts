import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.login.html'
})

export class LoginComponent {
  password = '';
  username = '';
  roles: Array<any> = [];
  token = '';
  message = 'Not logged in.';
  _apiService: ApiService;
  router: Router ;
  public site = 'http://localhost:1337/';

  // Since we are using a provider above we can receive
  // an instance through an constructor.
  constructor(private http: HttpClient, router: Router) {
    // Pass in http module and pointer to AppComponent.
    this._apiService = new ApiService(http, this);
    this.router = router;
    this.showContentIfLoggedIn();
  }

  showContentIfLoggedIn() {
    // Logged in if token exists in browser cache.
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
      this.message = "The user has been logged in."
    } else {
      this.message = "Not logged in.";
      this.token = '';
    }
  }

  login() {
    let url = this.site + "auth";

    // This free online service receives post submissions.
    this.http.post(url, {
      username: this.username,
      password: this.password,
    })
      .subscribe(
        // Data is received from the post request.
        (data) => {
          // Inspect the data to know how to parse it.
          console.log(JSON.stringify(data));

          let ROLES = "roles";
          let USER = "username";
          let EMAIL = "email";
          let FIRSTNAME = "FirstName";
          let LASTNAME = "LastName";

          console.log(data["user"].roles);
          console.log(data["user"].username);

          if (data["token"] != null) {
            this.token = data["token"];
            sessionStorage.setItem('auth_token', data["token"]);
            this.message = "The user has been logged in.";
            sessionStorage.setItem(USER, JSON.stringify(data["user"].username));
            sessionStorage.setItem(EMAIL, JSON.stringify(data["user"].email));
            sessionStorage.setItem(FIRSTNAME, JSON.stringify(data["user"].firstName));
            sessionStorage.setItem(LASTNAME, JSON.stringify(data["user"].lastName));
            if (data["user"].roles.length == 0) {
              // Here is some fake data.
              let roleObj = ['no roles'];
              this.roles = roleObj;
              // The roles returned from Node.js would be stored with
              // the following line of code inside login.ts.
              sessionStorage.setItem(ROLES, JSON.stringify(roleObj));
              sessionStorage.setItem(USER, JSON.stringify(this.username));
            } else {
              // Read roles from the cache and store in an array.
              sessionStorage.setItem(ROLES, JSON.stringify(data["user"].roles));
              this.roles = JSON.parse(sessionStorage.getItem(ROLES));
            }
            window.location.href = '/myEvents';
          }
        },
        // An error occurred. Data is not received.
        error => {
          alert(JSON.stringify(error));
        });

  }


}
