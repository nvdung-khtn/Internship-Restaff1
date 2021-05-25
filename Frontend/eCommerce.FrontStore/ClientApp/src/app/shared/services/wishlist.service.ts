import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../api-clients/models/product.model';
@Injectable({
    providedIn: 'root',
})
export class WishListService {
    public wishListItems: Product[] = JSON.parse(localStorage['wishlistItems'] || '[]');
    private _wishList$ = new BehaviorSubject<Product[]>(this.wishListItems);
    wishList$ = this._wishList$.asObservable();

    constructor(private http: HttpClient, private toastrService: ToastrService) {}

    // Add to Wishlist
    public addToWishlist(product: Product): void {
        product.quantity = product.quantity ? product.quantity : 1;
        const wishlistItem = this.wishListItems.find((item) => item.id === product.id);

        if (!wishlistItem) {
            this.wishListItems.push(product);
        }

        this.toastrService.success('Product has been added in wishlist.');
        this._wishList$.next(this.wishListItems);
        localStorage.setItem('wishlistItems', JSON.stringify(this.wishListItems));
    }

    // Remove Wishlist items
    public removeWishlistItem(product: Product): any {
        debugger;
        const index = this.wishListItems.findIndex((item) => {
            return item.id === product.id;
        });
        this.wishListItems.splice(index, 1);
        localStorage.setItem('wishlistItems', JSON.stringify(this.wishListItems));
        // update streams
        this._wishList$.next(this.wishListItems);
        //Notify
        this.toastrService.success('Product has been deleted in wishlist.');
    }

    // remove all the  items
    removeAllCartItem() {
        this.wishListItems.length = 0;
        this._wishList$.next(this.wishListItems);
    }

    isWishlist(productId): boolean {
        const wishlistItem = this.wishListItems.find((item) => item.id === productId);
        return wishlistItem ? true : false;
    }
}
