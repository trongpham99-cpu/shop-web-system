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
    return this.http.post(`${SERVER_API}/product`, product);
  }

  updateProduct(product: any) {
    return this.http.put(`${SERVER_API}/product`, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${SERVER_API}/product/${id}`);
  }
}
