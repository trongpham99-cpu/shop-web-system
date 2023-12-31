import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/main-about/about.component';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
