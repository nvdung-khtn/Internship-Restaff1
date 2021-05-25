import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PagedList } from "./models/common.model";
import { CreateProductRatingRequest, GetProductRatingRequest, GetStarInCardResponse, GetStarResponse, ProductRatingResponse } from "./models/productRating";

@Injectable({
    providedIn: 'root',
})
export class ProductRatingClient {
    private apiEndpoint = `${environment.apiUrl}/api/ProductRating`;
    private getStartApi = `${environment.apiUrl}/api/ProductRating/star`;
    private getStartInCardApi = `${environment.apiUrl}/api/ProductRating/star-in-card`;

    constructor(private http: HttpClient) { }

    addProductRating(productRating: CreateProductRatingRequest): Observable<any> {
        return this.http.post<any>(this.apiEndpoint, productRating);
    }

    getProductRating(getProductRatingRequest: GetProductRatingRequest): Observable<PagedList<ProductRatingResponse>> {
        return this.http.get<PagedList<ProductRatingResponse>>(`${this.apiEndpoint}?PageIndex= ${getProductRatingRequest.pageIndex}&PageSize=${getProductRatingRequest.pagesize}&ProductId=${getProductRatingRequest.productId}`);
    }

    getStart(idProduct: string): Observable<GetStarResponse> {
        return this.http.get<GetStarResponse>(`${this.getStartApi}/${idProduct}`);
    }

    getStartInCard(idProduct: string): Observable<GetStarInCardResponse> {
        return this.http.get<GetStarInCardResponse>(`${this.getStartApi}/${idProduct}`);
    }
}