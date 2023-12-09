import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(userLogin: any) {
    return this.http.post(`${SERVER_API}/login`, userLogin);
  }

  register(userRegister: any) {
    return this.http.post(`${SERVER_API}/signup`, userRegister);
  }

  getProfile() {
    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${userLogin.accessToken}`
    }

    return this.http.get(`${SERVER_API}/get-my-profile`, { headers });
  }

}
