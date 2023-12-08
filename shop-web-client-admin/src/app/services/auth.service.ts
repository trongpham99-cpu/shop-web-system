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
    return this.http.post(`${SERVER_API}`, userRegister);
  }

  getllUser() {
    return this.http.get(`${SERVER_API}/users`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${SERVER_API}/users/${id}`);
  }

  updateUser(id: any, user: any) {
    return this.http.put(`${SERVER_API}/users/${id}`, user);
  }

}
