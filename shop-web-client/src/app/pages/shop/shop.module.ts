import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { MainShopComponent } from './components/main-shop/main-shop.component';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    MainShopComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ToastModule,
    PaginatorModule,
  ],
})
export class ShopModule { }
