import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CouponsRoutingModule } from './coupons-routing.module';
import { ListCouponComponent } from './list-coupon/list-coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListCouponComponent, CreateCouponComponent],
  imports: [
    FormsModule,
    CommonModule,
    CouponsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    Ng2SmartTableModule,

  ]
})
export class CouponsModule { }
