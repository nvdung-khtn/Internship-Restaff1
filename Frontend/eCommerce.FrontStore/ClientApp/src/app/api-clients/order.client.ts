import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OrderClient {
    constructor(private http: HttpClient) {}

    //Get all category
    checkout(checkoutForm) {
        const url = `${environment.apiUrl}/frontstore/api/orders`;

        return this.http.post(url, checkoutForm);
    }
}
