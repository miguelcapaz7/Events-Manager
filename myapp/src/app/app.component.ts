import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // Hard-code credentials for convenience.
  roles = '';
  timestamp:string = "";
  username: string;
  token = '';
  message = 'Not logged in.';
  reqInfo: any = {};
  msgFromServer: string = '';
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
    let ROLE_KEY = "roles";


    if(sessionStorage.getItem('auth_token') != null) {
      this.token   = sessionStorage.getItem('auth_token');
      this.username   = sessionStorage.getItem('username').slice(1, -1);
      this.roles   = sessionStorage.getItem('roles');
      this.message = "The user has been logged in."
    }
    else {
      this.message = "Not logged in.";
      this.token   = '';
      this.username = '';
    }
  }

  clear() {
    sessionStorage.clear();
    this.showContentIfLoggedIn();

    // Clear data.
    this.reqInfo = {};
    this.msgFromServer = "";
    this.username = null;
    this.timestamp = "";
  }

}
