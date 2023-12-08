import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getListProduct(params: any) {
    return this.http.get(`${SERVER_API}/product`, { params });
  }

  getProductById(id: any) {
    return this.http.get(`${SERVER_API}/product/${id}`);
  }

  searchProduct(params: any) {
    return this.http.get(`${SERVER_API}/product/search`, { params });
  }

  createProduct(product: any) {
    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${userLogin.accessToken}`
    }

    return this.http.post(`${SERVER_API}/product`, product, { headers });
  }

  updateProduct(id: any, product: any) {

    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${userLogin.accessToken}`
    }

    return this.http.put(`${SERVER_API}/product/${id}`, product, { headers });
  }

  deleteProduct(id: any) {
    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${userLogin.accessToken}`
    }

    return this.http.delete(`${SERVER_API}/product/${id}`, { headers });
  }

  getAllForAdmin(params: any) {
    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${userLogin.accessToken}`
    }

    return this.http.get(`${SERVER_API}/product/admin/all`, { headers, params });
  }
}
