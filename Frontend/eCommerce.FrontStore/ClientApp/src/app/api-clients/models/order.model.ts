import { Property, User } from './product.model';

export class OrderDetail {
    id: string; //ProductId + propertyIndex
    productId: string;
    quantity: number;
    productName: string;
    productPrice: number;
    photo: string; // Ảnh đại diện
    ownerProduct: User;
    selectedProperty: Property[];
    propertyString: string;
    constructor(
        productId,
        quantity,
        productName,
        productPrice,
        photo,
        ownerProduct,
        selectedProperty
    ) {
        this.id =
            productId +
            (function () {
                let ret = '';
                selectedProperty.forEach((property) => {
                    ret += property.index;
                });

                return ret;
            })();
        this.productId = productId;
        this.quantity = quantity;
        this.productName = productName;
        this.productPrice = productPrice;
        this.photo = photo;
        this.ownerProduct = ownerProduct;
        this.selectedProperty = selectedProperty;
        this.propertyString = (function () {
            let propertyString = '';
            selectedProperty.forEach((property) => {
                propertyString += ` ${property.name} - ${property.value},`;
            });
            return propertyString.trim();
        })();
    }
}

export class Order {
    buyerEmail: string;
    buyerName: string;
    buyerPhone: string;
    address: string;
    orderItems: OrderDetail[];
    couponCode: string;
    orderValue: number;
    // buyDate: Date;
}
