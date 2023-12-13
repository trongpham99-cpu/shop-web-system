import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createProduct(product: any, file: any) {
    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;

    var header = {
      headers: new HttpHeaders().set('Authorization', `${userLogin.accessToken}`)
    };

    const formData = new FormData();
    formData.append('product_name', product.product_name);
    formData.append('product_price', product.product_price);
    formData.append('product_description', product.product_description);
    formData.append('product_type', 'clothing');
    formData.append('product_quantity', '5');
    formData.append('file', file);

    return this.http.post(`${SERVER_API}/product`, formData, header);
  }

  updateImageProduct = (id: any, file: any) => {
    let userLogin = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;

    var header = {
      headers: new HttpHeaders().set('Authorization', `${userLogin.accessToken}`)
    };

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${SERVER_API}/product/${id}/image`, formData, header);
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
