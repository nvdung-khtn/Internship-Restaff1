export class Order {
    stt: number;
    id: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    address: string;
    price: number;
    totalAmount: number;
    quantity: number;
    actualPrice: number;
    product: Product;
    status: number;
    createdDate: Date;
    propertyString: string;
    // createBy: string;
    // lastUpdate?: Date;
    // lastUpdateBy?: string;
}

class Product {
    id: string;
    name: string;
}

enum OrderStatus {
    New = 1,
    Approved = 2,
    Cancelled = 3,
}

export class SearchRequestOrder {
    startDate?: string;
    endDate?: string;
    status?: string;
    pageIndex?: string;
    pageSize?: string;
    orderBy?: string;
}
