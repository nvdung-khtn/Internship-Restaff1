import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponClient } from 'src/app/api-clients/coupon.client';
import { Coupon } from 'src/app/api-clients/models/coupon.model';

@Component({
    selector: 'app-coupon-modal',
    templateUrl: './coupon-modal.component.html',
    styleUrls: ['./coupon-modal.component.scss'],
})
export class CouponModalComponent implements OnInit {
    @Output() emitService = new EventEmitter();
    @Input() orderValue;
    public coupons: Coupon[];
    selectedCode: string;
    constructor(public modal: NgbActiveModal, private couponClient: CouponClient) {
      
    }

    ngOnInit() {
        console.log(this.orderValue);
        this.couponClient.getAllValidCoupon(this.orderValue).subscribe((response) => {
            this.coupons = response;
            console.log(this.coupons);
        });
    }

    onClick() {
        this.emitService.next(this.selectedCode);
        this.modal.close('Ok click');
    }

    handleChange(event) {
        this.selectedCode = event.target.value;
    }
}
