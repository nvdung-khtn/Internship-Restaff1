export class Coupon {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    minPrice: number;
    value: number;
    lastUpdated: Date;
    lastUpdatedBy: string;
    code: string;
}

export class SearchValidCouponRequest {
    code: string;
    orderValue: string;

    constructor(code, orderValue) {
        this.code = code;
        this.orderValue = orderValue;
    }
}
