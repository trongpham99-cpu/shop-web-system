import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { MainShopComponent } from './components/main-shop/main-shop.component';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    MainShopComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ToastModule,
    PaginatorModule,
    InputTextModule,
    TagModule
  ],
})
export class ShopModule { }
