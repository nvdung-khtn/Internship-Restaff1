class ProductRatingBase {
    fullName: string;

    email: string;

    reviewTitle: string;

    numberStar: number

    reviewContent: string;

}


export class CreateProductRatingRequest extends ProductRatingBase {

    productId: string;


    constructor(fullName: string, email: string, productId: string, reviewTitle: string, reviewContent: string, numberStar: number) {
        super();
        this.fullName = fullName;
        this.email = email;
        this.productId = productId;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.numberStar = numberStar;
    }
}

export class ProductRatingResponse extends ProductRatingBase {
    product: Product;
    createDate: Date;
}

class Product {
    id: string;
    name: string;
    price: number
}

export class GetProductRatingRequest {
    productId: string;
    pageIndex: number;
    pagesize: number;

    constructor(productId: string, pageIndex: number, pageSize: number) {
        this.productId = productId;
        this.pageIndex = pageIndex;
        this.pagesize = pageSize;
    }
}

export class GetStarResponse {
    productId: string;
    numberRating: number;
    sumValue: number;
    maxStart: number;
    avgValueDouble: number;
    startValues: StartValue[];
}

export class StartValue {
    numberStar: number;
    numberRating: number;
}

export class GetStarInCardResponse {
    productId: string;
    avgValueDouble: number;
}