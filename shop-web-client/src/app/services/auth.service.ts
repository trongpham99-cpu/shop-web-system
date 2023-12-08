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
}
