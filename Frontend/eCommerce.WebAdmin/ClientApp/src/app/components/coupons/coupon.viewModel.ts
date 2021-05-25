import { Coupon } from "src/app/api-clients/models/coupon.model";

export class CouponViewModel {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    minPrice: number;
    value: number;
    code: string;

    constructor(coupon: Coupon) {
        this.id = coupon.id;
        this.name = coupon.name;
        this.description = coupon.description;
        this.startDate = coupon.startDate;
        this.endDate = coupon.endDate;
        this.minPrice = coupon.minPrice;
        this.value = coupon.value;
        this.code = coupon.code;
    }
}