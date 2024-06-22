import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const USER_AUTH_API_URL = '/api-url';

@Injectable()
export class AuthenticationService {
    private baseUrl: string = 'http://localhost:8089/immobilier/authenticate/';

    constructor(private http: HttpClient,private router:Router ) {

  
    }
  
    signUp(userObj: any) {
      return this.http.post<any>(`${this.baseUrl}register`, userObj);
    }
  
    login(loginObj: any) {
      return this.http.post<any>(`${this.baseUrl}login`, loginObj);
    }
  
    storeToken(tokenValue: string) {
      localStorage.setItem('token', tokenValue);
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
    isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
    }
    logout(){
       localStorage.removeItem('token');
       this.router.navigate(['']);
    }
  
}