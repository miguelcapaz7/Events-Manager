import { Component  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.logout.html'
})
export class LogoutComponent {
  roles: string;
  username: string;
  token = '';
  message = 'Not logged in.';
  secureData: string;
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
    if(sessionStorage.getItem('auth_token')!=null) {
      this.token   = sessionStorage.getItem('auth_token');
      this.username   = sessionStorage.getItem('username');
      this.roles   = sessionStorage.getItem('roles');
      this.message = "The user has been logged in."
    }
    else {
      this.message = "Not logged in.";
      this.token   = '';
    }
  }

  logout() {
    sessionStorage.clear();
    this.showContentIfLoggedIn();

    // Clear data.
    this.secureData = "";
    this.reqInfo = {};
    this.msgFromServer = "";
    this.router.navigate(['/login']);
  }
}
