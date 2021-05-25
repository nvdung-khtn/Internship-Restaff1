import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
    GetStarInCardResponse,
    Product,
    ProductList,
    UpdateProductModel,
} from 'src/app/api-clients/models/product.model';
import { Observable } from 'rxjs';
import { PagedList, SearchRequestProduct } from './models/common.model';

@Injectable({
    providedIn: 'root', //???
})
export class ProductClient {
    private baseUrl = `${environment.apiUrl}/Products`;

    constructor(protected httpClient: HttpClient) {}

    addProduct(newProduct: Product) {
        return this.httpClient.post<Product>(this.baseUrl, newProduct);
    }

    getProductDetail(productId: string) {
        const url = `${this.baseUrl}/${productId}`;
        return this.httpClient.get(url);
    }

    getAllCategory() {
        const url = `${environment.apiUrl}/ProductCategories`;
        return this.httpClient.get(url);
    }

    searchProducts(
        rq: SearchRequestProduct = new SearchRequestProduct()
    ): Observable<PagedList<ProductList>> {
        const options = {
            params: { ...rq },
        };

        return this.httpClient.get<PagedList<ProductList>>(
            this.baseUrl,
            options
        );
    }

    deleteProducts(productId: string) {
        const url = `${this.baseUrl}/${productId}`;
        return this.httpClient.delete(url);
    }

    updateProduct(rq: any): Observable<Product> {
        const option = { params: { ...rq } };
        return this.httpClient.put<Product>(this.baseUrl, rq);
    }

    getStartInCard(productId: string): Observable<GetStarInCardResponse> {
        const getStartApi = `${environment.apiUrl}/ProductRating/star`;

        return this.httpClient.get<GetStarInCardResponse>(
            `${getStartApi}/${productId}`
        );
    }
}
