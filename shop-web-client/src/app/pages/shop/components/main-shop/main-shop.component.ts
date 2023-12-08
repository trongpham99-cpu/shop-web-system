import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main-shop',
  templateUrl: './main-shop.component.html',
  styleUrls: ['./main-shop.component.scss']
})
export class MainShopComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }
  public user = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;
  public products: any = [];
  first: number = 1;
  rows: number = 8;
  totalRecords: number = 100;

  ngOnInit(): void {
    this.getListProduct();
  }

  addToCart(product: any) {
    if (!this.user) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please login to add product to cart' });
      return;
    }

    let carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts') || '') : [];
    const index = carts.findIndex((item: any) => item._id === product._id);
    if (index !== -1) {
      carts[index].quantity += 1;
    } else {
      carts.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem('carts', JSON.stringify(carts));
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add product to cart success' });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.getListProduct({
      limit: 8,
      page: event.page + 1,
    });
  }

  getListProduct(params = {}) {
    this.productService.getListProduct({
      ...params,
      limit: 8,
    }).subscribe((res: any) => {
      const { metadata: { products, totalDocuments } } = res;
      this.totalRecords = totalDocuments;
      this.products = products;
    });
  }

  convertPriceVNDToUSD(price: number) {
    return (price / 23000).toFixed(2);
  }

}
