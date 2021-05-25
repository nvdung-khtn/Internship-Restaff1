import { min } from "rxjs/operators";

export class Coupon {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    minPrice: number;
    value: number;
    code: string;
}

export class CreateCouponRequest {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    minPrice: number;
    value: number;
    code: string

    constructor(name: string, description: string, startDate: Date, endDate: Date, minPrice: number, value: number, code: string) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minPrice = minPrice;
        this.value = value;
        this.code = code;
    };
}

