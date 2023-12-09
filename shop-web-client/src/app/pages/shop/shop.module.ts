import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { MainShopComponent } from './components/main-shop/main-shop.component';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    MainShopComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ToastModule,
    PaginatorModule,
    InputTextModule
  ],
})
export class ShopModule { }
