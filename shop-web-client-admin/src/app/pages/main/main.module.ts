import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { ManagementProductComponent } from './components/management-product/management-product.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';
import { ManagementOrderComponent } from './components/management-order/management-order.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    MainComponent,
    ManagementProductComponent,
    ManagementUserComponent,
    ManagementOrderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class MainModule { }
