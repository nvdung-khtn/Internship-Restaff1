import { Router } from '@angular/router';
import { CouponClient } from './../../api-clients/coupon.client';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderClient } from 'src/app/api-clients/order.client';
import { takeUntil } from 'rxjs/operators';
import { Order, OrderDetail } from 'src/app/api-clients/models/order.model';
import { SearchValidCouponRequest } from 'src/app/api-clients/models/coupon.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
    public checkoutForm: FormGroup;
    public orderDetails: OrderDetail[] = [];
    public payment: string = 'Stripe';
    private code: string;
    public discountPercent: number = 0;
    ngUnsubscribe = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        public cartService: CartService,
        private couponClient: CouponClient,
        private orderClient: OrderClient,
        private toastr: ToastrService,
        private router: Router
    ) {
        const address = JSON.parse(localStorage.getItem('checkoutForm'));

        this.checkoutForm = this.fb.group({
            fullName: [address ? address.fullName : '', [Validators.required]],
            phone: [
                address ? address.phone : '',
                [Validators.required, Validators.pattern('[0-9]+')],
            ],
            email: [address ? address.email : '', [Validators.required, Validators.email]],
            province: [address ? address.province : '', Validators.required],
            district: [address ? address.district : '', Validators.required],
            ward: [address ? address.ward : '', Validators.required],
            street: [
                address ? address.street : '',
                [Validators.required, Validators.maxLength(50)],
            ],
        });
    }

    ngOnInit(): void {
        this.code = localStorage.getItem('code') ? localStorage.getItem('code') : '';
        const params = new SearchValidCouponRequest(this.code, this.getTotal);

        this.couponClient
            .getCouponValue(params)
            .subscribe((response) => (this.discountPercent = response));

        this.cartService.cart$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => (this.orderDetails = response));
        //this.getProductsInCart();
    }

    public get getTotal(): number {
        return this.cartService.getTotalPrice();
    }

    public get cartTotalAmount(): number {
        return this.cartService.cartTotalAmount(null, this.discountPercent);
    }

    checkout() {
        if (this.checkoutForm.invalid) {
            this.toastr.error('Please fill in the delivery address', 'Error');
            this.checkoutForm.markAllAsTouched();
            return;
        }

        const checkoutForm = this.checkoutForm.value;
        const formData: Order = {
            buyerEmail: checkoutForm.email,
            buyerName: checkoutForm.fullName,
            buyerPhone: checkoutForm.phone,
            address:
                checkoutForm.street +
                ', ' +
                checkoutForm.ward +
                ', ' +
                checkoutForm.district +
                ', ' +
                checkoutForm.province,
            orderItems: this.orderDetails,
            couponCode: this.code,
            orderValue: this.getTotal,
        };

        this.orderClient.checkout(formData).subscribe(
            (response) => {
                this.cartService.resetLocalStorage();
                this.cartService.resetLocalStorage();
                this.storeAddressToLocalStorage();
                localStorage.setItem('order', JSON.stringify(formData));
                localStorage.setItem('percent', this.discountPercent.toString());
                this.router.navigate(['/shop/checkout/success']);
            },
            (error) => this.toastr.error('Checkout is failed', 'Error')
        );
    }

    storeAddressToLocalStorage() {
        localStorage.setItem('checkoutForm', JSON.stringify(this.checkoutForm.value));
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
