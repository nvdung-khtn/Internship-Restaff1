import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, Property } from '../../api-clients/models/product.model';
import { WishListService } from 'src/app/shared/services/wishlist.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
    public products: Product[] = [];
    ngUnsubscribe = new Subject<void>();

    constructor(
        private router: Router,
        public cartService: CartService,
        private wishListService: WishListService
    ) {}

    ngOnInit() {
        this.wishListService.wishList$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => (this.products = response));
    }

    addToCart(product: any) {
        this.initializeSelectedProperty(product);
        this.cartService.addToCart(product, 1);
        this.removeItem(product);
        this.router.navigate(['/shop/cart']);
    }

    removeItem(product: any) {
        this.wishListService.removeWishlistItem(product);
    }

    // Initialize Selected Property with default properties have index equal 0
    initializeSelectedProperty(product) {
        product.selectedProperty = [];
        let count = 1;
        while (product.category[`c${count}Lable`]) {
            let name = product.category[`c${count}Lable`];
            let value = product.category[`c${count}Options`].split(',')[0].trim();
            product.selectedProperty.push(new Property(0, name, value));
            count++;
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
