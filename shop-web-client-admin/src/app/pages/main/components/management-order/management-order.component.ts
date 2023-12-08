import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-management-order',
  templateUrl: './management-order.component.html',
  styleUrls: ['./management-order.component.scss']
})
export class ManagementOrderComponent implements OnInit {

  constructor(
    private orderService: OrderService
  ) { }

  public orders: any = [];
  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder = () => {
    this.orderService.getAllOrder().subscribe((res: any) => {
      const { metadata } = res;
      console.log(metadata);
      this.orders = metadata;
    })
  }
  selectedOrder: any = null;
  orderDialogVisible = false;

  viewOrder = (order: any) => {
    // this.orderService.viewOrder(id).subscribe((res: any) => {
    //   console.log(res);
    //   this.getAllOrder();
    // })
    this.orderDialogVisible = true;
    this.selectedOrder = order;

  }

  deleteOrder = (id: number) => {
    // this.orderService.deleteOrder(id).subscribe((res: any) => {
    //   console.log(res);
    //   this.getAllOrder();
    // })
  }

  editOrder = (id: any, order: any) => {
    // this.orderService.updateOrder(id, order).subscribe((res: any) => {
    //   console.log(res);
    //   this.getAllOrder();
    // })
  }

  resetSelectedOrder = () => {
    this.selectedOrder = null;
  }

}
