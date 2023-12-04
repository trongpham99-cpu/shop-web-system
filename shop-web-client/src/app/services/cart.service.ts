import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  getHeader() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'x-api-key': '26ef6f8a7977f5ec346b7ad8f5892f1d',
      'x-client-id': '64e1a0beb00134347c2f0b60'
    }

    return headers;
  }

  addToCart(product: any) {
    const headers = this.getHeader();
    return this.http.post(`${SERVER_API}/cart`, product, { headers });
  }

  update(product: any) {
    const headers = this.getHeader();
    return this.http.post(`${SERVER_API}/cart/update`, product, { headers });
  }

  delete(product: any) {
    const headers = this.getHeader();
    return this.http.post(`${SERVER_API}/cart`, product, { headers });
  }

  getCart() {
    const headers = this.getHeader();
    return this.http.get(`${SERVER_API}/cart`, { headers });
  }

}
