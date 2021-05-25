import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersRoutingModule } from './orders-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';

@NgModule({
    declarations: [ListOrderComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        OrdersRoutingModule,
    ],
})
export class OrdersModule {}
