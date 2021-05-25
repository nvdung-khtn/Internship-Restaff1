import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchRequestProduct } from 'src/app/api-clients/models/common.model';
import { ProductClient } from 'src/app/api-clients/product.client';
import { MoneyPipe } from 'src/app/shared/service/moneyPipe';

@Component({
    selector: 'app-digital-list',
    templateUrl: './digital-list.component.html',
    styleUrls: ['./digital-list.component.scss'],
    providers: [ProductClient],
})
export class DigitalListComponent implements OnInit {
    public product_list: any;
    rq: SearchRequestProduct = {};

    constructor(
        protected productClient: ProductClient,
        private router: Router,
        private moneyPipe: MoneyPipe
    ) {}

    async loadData() {
        this.rq.sort = 'CreatedDate|true';
        this.rq.pageSize = '100';
        this.rq.pageNumber = '0';
        let products = await this.productClient
            .searchProducts(this.rq)
            .toPromise();

        this.product_list = products.items;
        console.log(this.product_list, this.rq);
    }

    public settings = {
        pager: {
            display: true,
            perPage: 5,
        },
        actions: {
            position: 'left',
            add: false,
            delete: false,
            edit: false,
        },
        columns: {
            photos: {
                title: 'Image',
                type: 'html',
                valuePrepareFunction: (photos) => {
                    return '<img src="' + photos[0].url + '" width="170px"/>';
                },
                filter: false,
                width: '25%',
            },
            name: {
                title: 'Product Name',
                width: '25%',
            },
            price: {
                title: 'Price',
                valuePrepareFunction: (price) => {
                    return this.moneyPipe.MoneyPipeVND(price);
                },
                width: '15%',
            },
            category: {
                title: 'Category',
                valuePrepareFunction: (category) => {
                    return category.name;
                },
                filterFunction(category?: any, search?: string): boolean {
                    if (category.name.toLowerCase().indexOf(search) > -1)
                        return true;
                    return false;
                },
                width: '15%',
            },
            owner: {
                title: 'Owner',
                valuePrepareFunction: (owner) => {
                    return owner.username;
                },
                filterFunction(owner?: any, search?: string): boolean {
                    if (owner.username.toLowerCase().indexOf(search) > -1)
                        return true;
                    return false;
                },
                width: '20%',
            },
        },
    };

    ngOnInit() {
        this.loadData();
    }

    onProductRowSelected(event) {
        const productId = event.data.id;
        this.router.navigate(['/products/product-detail', productId]);
    }
}
