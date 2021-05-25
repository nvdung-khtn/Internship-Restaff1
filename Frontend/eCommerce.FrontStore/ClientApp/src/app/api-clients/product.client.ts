import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PagedList } from './models/common.model';
import { Product, SearchRequestProduct } from './models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductClient {
    public Products;
    constructor(private http: HttpClient) {}

    //Search  Product
    searchProducts(
        rq: SearchRequestProduct = new SearchRequestProduct()
    ): Observable<PagedList<Product>> {
        const url = `${environment.apiUrl}/frontstore/api/products`;
        const options = {
            params: { ...rq },
        };
        return this.http.get<PagedList<Product>>(url, options);
    }

    //Get by Id
    getProductDetail(productId: string): Observable<Product> {
        const url = `${environment.apiUrl}/frontstore/api/products/${productId}`;
        return this.http.get<Product>(url);
    }
}
