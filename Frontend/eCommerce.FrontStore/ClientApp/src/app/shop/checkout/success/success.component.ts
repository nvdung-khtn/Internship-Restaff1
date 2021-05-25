import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../../api-clients/models/order.model';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit, OnDestroy {
    public DELIVERY_PRICE = 9999;
    public order: Order;
    public orderDate = new Date();
    public orderId: string = '81910d83-74bc-4317-bc67-da2f912c7289';
    public discountPercent: number = 0;
    public discountValue: number = 0;
    public totalValue: number = 0;

    constructor(public productService: ProductService, private orderService: OrderService) {}

    ngOnInit() {
        this.order = JSON.parse(localStorage.getItem('order'));
        this.discountPercent = +JSON.parse(localStorage.getItem('percent'));
        this.discountValue = (this.order.orderValue * this.discountPercent) / 100;
        this.totalValue = this.order.orderValue - this.discountValue + this.DELIVERY_PRICE;
    }

    ngOnDestroy() {
        localStorage.removeItem('order');
        localStorage.removeItem('percent');
    }
}
