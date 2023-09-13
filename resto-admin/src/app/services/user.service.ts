import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class UserService {

    API_URI  = 'http:/localhost:3000';

    constructor (private http: HttpClient, private cookies: CookieService) {

    }
    setToken(token: any) {
      this.cookies.set("token",token);
    }

    getToken() {
      return this.cookies.get("token");
    }
 
 
    register (user : any) {
      //`${this.API_URI}/api/login/register`
        return this.http.post('http://localhost:3000/api/login/register', user )
    }

    login (user:any ){
        return this.http.post(`http://localhost:3000/api/login/`, user)
    }

    getUser ( token:string){
        return this.http.get(`http://localhost:3000/api/login/${token}`)
    }

}
