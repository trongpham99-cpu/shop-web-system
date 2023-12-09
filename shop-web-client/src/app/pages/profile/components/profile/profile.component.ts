import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
  ) { }

  public profile: any;
  public orders: any;

  ngOnInit() {
    this.getProfile();
    this.getOrders();
  }

  getProfile() {
    return this.authService.getProfile().subscribe((res: any) => {
      const { metadata = {} } = res;
      this.profile = metadata;
    });
  }

  getOrders() {
    return this.orderService.getMyOrders().subscribe((res: any) => {
      console.log(res);
      const { metadata = {} } = res;
      this.orders = metadata;
    });
  }

  orderDialogVisible: boolean = false;
  selectedOrder: any;

  showOrderDialog(order: any) {
    this.selectedOrder = order;
    this.orderDialogVisible = true;
  }

  convertPrice(price: any) {
    return (price / 23000).toFixed(2);
  }

}
