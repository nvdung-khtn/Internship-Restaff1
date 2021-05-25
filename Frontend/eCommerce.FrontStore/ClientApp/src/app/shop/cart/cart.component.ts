import { OrderDetail } from './../../api-clients/models/order.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CouponClient } from 'src/app/api-clients/coupon.client';
import { Coupon, SearchValidCouponRequest } from 'src/app/api-clients/models/coupon.model';
import { CouponModalComponent } from 'src/app/shared/components/modal/coupon-modal/coupon-modal.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { Product } from '../../api-clients/models/product.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
    public orderDetails: OrderDetail[] = [];
    discountPercent: number = 0;
    code: string = '';
    errorMessage: string;
    ngUnsubscribe = new Subject<void>();

    constructor(
        public cartService: CartService,
        private couponClient: CouponClient,
        private router: Router,
        private _modalService: NgbModal
    ) {}

    ngOnInit() {
        this.cartService.cart$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => (this.orderDetails = response));
    }

    public get getTotal(): number {
        return this.cartService.getTotalPrice();
    }

    public get cartTotalAmount(): number {
        return this.cartService.cartTotalAmount(null, this.discountPercent);
    }

    // Increament
    increment(product, qty = 1) {
        this.cartService.updateCartQuantity(product, qty);
    }

    // Decrement
    decrement(product, qty = -1) {
        this.cartService.updateCartQuantity(product, qty);
    }

    public removeItem(product: any) {
        this.cartService.removeCartItem(product);
    }

    handleCoupon(code) {
        this.discountPercent = 0;
        if (!code) {
            this.errorMessage = 'Please enter coupon code';
            return;
        }
        const params = new SearchValidCouponRequest(code, this.getTotal);
        console.log('params: ', params);
        this.couponClient.getCouponValue(params).subscribe(
            (response) => {
                this.errorMessage = '';
                this.discountPercent = response;
                localStorage.setItem('discountPercent', this.discountPercent.toString());
            },
            (error) => {
                this.discountPercent = 0;
                this.errorMessage = error.error.errorMessage;
            }
        );
    }

    checkout() {
        debugger;
        if (this.discountPercent === 0) {
            this.code = '';
        }

        localStorage.setItem('code', this.code);
        this.router.navigate(['/shop/checkout']);
    }

    open() {
        const modalRef = this._modalService.open(CouponModalComponent);
        modalRef.componentInstance.orderValue = this.getTotal;
        modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
            this.code = emmitedValue;
            this.handleCoupon(this.code);
        });
    }

    onCouponInput() {
        this.errorMessage = '';
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
