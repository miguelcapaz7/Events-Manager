import { HttpClient, HttpHeaders } from '@angular/common/http';

export class ApiService {
    public site='http://localhost:1337/';
    // Pointer to component using ApiService.
    _that:any;

    constructor(private http: HttpClient, that) {
        // Pointer to component using ApiService.
        this._that = that;
    }

    //------------------------------------------------------------
    // Creates request header with Jwt Bearer token.
    //------------------------------------------------------------
    getSecureHeader() {
        let token   = sessionStorage.getItem('auth_token');

        // To access data from the server while authenticated the
        // token must be included in the request.
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type',
                              'application/json; charset=utf-8');
        headers = headers.append('Authorization', 'Bearer ' + token);
        return headers;
    }

    //------------------------------------------------------------
    // Implements GET request and sends data back to component
    // through callback.
    //------------------------------------------------------------
    getData(route, callback) {
        let url     = this.site + route;
        let headers = this.getSecureHeader();

        this.http.get<any>(url, {headers})
            // Get data and wait for result.
            .subscribe(result => {
             //   result.errorMessage = "";
                callback(result, this._that);
            },
            error =>{
                callback({errorMessage:JSON.stringify(error)},
                          this._that);
            })
    }
}
