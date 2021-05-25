import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './list-category/category.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CategoryhRoutingModule } from './category-routing.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryDetailsComponent } from './details-category/categoryDetails.component';


@NgModule({
  declarations: [CategoryComponent, CreateCategoryComponent, CategoryDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryhRoutingModule,
    NgbModule,
    CarouselModule,
    SharedModule,
    Ng2SmartTableModule
  ]
})
export class CategoryModule { }
