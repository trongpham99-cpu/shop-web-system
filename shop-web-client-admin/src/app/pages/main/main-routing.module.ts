import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ManagementProductComponent } from './components/management-product/management-product.component';
import { ManagementOrderComponent } from './components/management-order/management-order.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'management-product', component: ManagementProductComponent },
      { path: 'management-order', component: ManagementOrderComponent },
      { path: 'management-user', component: ManagementUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
