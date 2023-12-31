import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  checkout(data: any) {
    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${userLogin.accessToken}`
    }

    return this.http.post(`${SERVER_API}/checkout`, data, { headers });
  }

  getMyOrders() {
    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${userLogin.accessToken}`
    }

    return this.http.get(`${SERVER_API}/checkout`, { headers });
  }
}
