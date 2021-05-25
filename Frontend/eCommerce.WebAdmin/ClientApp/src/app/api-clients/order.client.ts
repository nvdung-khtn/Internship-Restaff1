import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagedList, SearchRequest } from './models/common.model';
import { Order, SearchRequestOrder } from './models/order.model';

@Injectable({
    providedIn: 'root',
})
export class OrderClient {
    private baseUrl = `${environment.apiUrl}/Orders`;

    constructor(protected httpClient: HttpClient) {}

    getAllOrder(): Observable<PagedList<Order>> {
        const url = `${this.baseUrl}`;
        return this.httpClient.get<PagedList<Order>>(url);
    }

    acceptOrder(id: string) {
        return this.httpClient.post(
            `${environment.apiUrl}/Orders/${id}/accept`,
            id
        );
    }

    rejectOrder(id: string) {
        return this.httpClient.post(
            `${environment.apiUrl}/Orders/${id}/reject`,
            id
        );
    }

    searchOrder(
        rq: SearchRequestOrder = new SearchRequestOrder()
    ): Observable<PagedList<Order>> {
        const options = {
            params: { ...rq },
        };

        return this.httpClient.get<PagedList<Order>>(this.baseUrl, options);
    }
}
