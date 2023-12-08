import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private orderService: OrderService
  ) { }

  public deliveryInformation = {
    fullName: '',
    phoneNumber: '',
    address: '',
    note: '',
  };

  ngOnInit(): void {
    this.calculateTotal()
  }

  public total = 0;
  public carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts') || '') : [];

  calculateTotal() {
    let total = 0;
    this.carts.forEach((cart: any) => {
      total += cart.product_price * cart.quantity;
    });
    this.total = total;
  }

  convertPrice(price: number) {
    return (price / 23000).toFixed(2);
  }

  checkout() {
    const order = {
      carts: this.carts,
      deliveryInformation: this.deliveryInformation,
    }
    this.orderService.checkout(order).subscribe((res: any) => {
      this.carts = [];
      this.deliveryInformation = {
        fullName: '',
        phoneNumber: '',
        address: '',
        note: '',
      };
      localStorage.removeItem('carts');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Checkout success' });

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    });
  }

}
