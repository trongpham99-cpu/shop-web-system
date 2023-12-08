import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { FormsModule } from '@angular/forms';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
  ]
})
export class BlogModule { }
