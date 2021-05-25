import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetail } from 'src/app/api-clients/models/order.model';
import { Product } from '../../api-clients/models/product.model';
@Injectable({
    providedIn: 'root',
})
export class CartService {
    public Currency = {
        name: 'VND',
        currency: 'VND',
        price: 1,
    };
    public DELIVERY_PRICE = 9999;
    public OpenCart: boolean = false;
    public cartItems: OrderDetail[] = JSON.parse(localStorage['cartItems'] || '[]');
    private _cart$ = new BehaviorSubject<OrderDetail[]>(this.cartItems);
    cart$ = this._cart$.asObservable();

    constructor(private http: HttpClient, private toastrService: ToastrService) {}

    // Add to Cart
    public addToCart(product: Product, count: number = 1): void {
        const orderDetail = this.convertProductToOrderDetail(product, count);
        // Check same productId or not?
        const cartItem = this.cartItems.find((item) => item.id === orderDetail.id);

        if (cartItem) {
            cartItem.quantity += orderDetail.quantity;
        } else {
            this.cartItems.push(orderDetail);
        }

        this._cart$.next(this.cartItems);
        this.OpenCart = true; // If we use cart variation modal
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

        // notify
        this.toastrService.success('Success! Item Successfully added to your cart');
    }

    // Remove Cart items
    public removeCartItem(product: OrderDetail): any {
        const index = this.cartItems.indexOf(product);
        this.cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        // update streams
        this._cart$.next(this.cartItems);

        // notify
        this.toastrService.success('Success! Item Successfully deleted to your cart');
    }

    // remove all the  items added to the cart
    removeAllCartItem() {
        this.cartItems.length = 0;
        this._cart$.next(this.cartItems);

        // notify
        this.toastrService.success('Remove all product is successful', 'Success');
    }

    getTotalPrice() {
        let total = 0;
        this.cartItems.forEach((item) => {
            total += item.productPrice * item.quantity;
        });

        return total;
    }

    cartTotalAmount(deliveryPrice, discountPercent = 0) {
        const shipFee = deliveryPrice ? deliveryPrice : this.DELIVERY_PRICE;
        const totalPrice = this.getTotalPrice();
        const total = totalPrice + shipFee - (totalPrice * discountPercent) / 100;
        return total;
    }

    // Update Cart Quantity
    public updateCartQuantity(product: OrderDetail, quantity: number): OrderDetail | boolean {
        return this.cartItems.find((items, index) => {
            if (items.id === product.id) {
                const qty = this.cartItems[index].quantity + quantity;

                if (qty !== 0) {
                    this.cartItems[index].quantity = qty;
                }

                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
                this._cart$.next(this.cartItems);
                return true;
            }
        });
    }

    public get itemNumber(): number {
        let itemNumber = 0;
        this.cartItems.forEach((item) => {
            itemNumber += item.quantity;
        });

        return itemNumber;
    }

    public resetLocalStorage() {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('code');
        this.cartItems = [];
        this._cart$.next(this.cartItems);
    }

    private convertProductToOrderDetail(product: Product, count: number) {
        return new OrderDetail(
            product.id,
            count,
            product.name,
            product.price,
            product.photos[0],
            product.owner,
            product.selectedProperty
        );
    }
}
