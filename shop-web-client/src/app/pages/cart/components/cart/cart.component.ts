import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.calculateTotal()
  }

  calculateTotal() {
    let total = 0;
    this.carts.forEach((cart: any) => {
      total += cart.product_price * cart.quantity;
    });
    this.total = total;
  }

  public total = 0;
  public carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts') || '') : [];
  public deliveryInformation = {
    fullName: '',
    phoneNumber: '',
    address: '',
    note: '',
  };
  stateDrawer = {
    visibleCart: false,
    visibleInformationDelivery: false,
    visibleReview: false,
  }

  delivery() {
    this.stateDrawer = {
      visibleCart: false,
      visibleInformationDelivery: true,
      visibleReview: false,
    };
  }

  review() {
    this.stateDrawer = {
      visibleCart: false,
      visibleInformationDelivery: false,
      visibleReview: true,
    };
  }

  convertPrice(price: number) {
    return (price / 23000).toFixed(2);
  }

  backToCart() {
    this.stateDrawer = {
      visibleCart: true,
      visibleInformationDelivery: false,
      visibleReview: false,
    };
  }

  showDrawer() {
    this.carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts') || '') : [];
    this.stateDrawer = {
      visibleCart: true,
      visibleInformationDelivery: false,
      visibleReview: false,
    };
  }

  removeCart(cart: any) {
    let carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts') || '') : [];
    const index = carts.findIndex((item: any) => item._id === cart._id);
    if (index !== -1) {
      carts.splice(index, 1);
    }
    this.calculateTotal()
    localStorage.setItem('carts', JSON.stringify(carts));
    this.carts = carts;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Remove product success' });
  }

  decreaseQuantity(cart: any) {
    let carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts') || '') : [];
    const index = carts.findIndex((item: any) => item._id === cart._id);
    if (index !== -1) {
      if (carts[index].quantity > 1) {
        carts[index].quantity--;
      }
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    this.carts = carts;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Decrease quantity success' });
    this.calculateTotal()
  }

  increaseQuantity(cart: any) {
    let carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts') || '') : [];
    const index = carts.findIndex((item: any) => item._id === cart._id);
    if (index !== -1) {
      carts[index].quantity++;
    }
    this.calculateTotal()
    localStorage.setItem('carts', JSON.stringify(carts));
    this.carts = carts;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Increase quantity success' });
    this.calculateTotal()
  }

}
