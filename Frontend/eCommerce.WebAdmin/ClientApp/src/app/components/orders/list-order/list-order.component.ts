import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagedList } from 'src/app/api-clients/models/common.model';
import {
    Order,
    SearchRequestOrder,
} from 'src/app/api-clients/models/order.model';
import { OrderClient } from 'src/app/api-clients/order.client';
import { MoneyPipe } from 'src/app/shared/service/moneyPipe';
import { OrderViewModel } from '../order.viewModel';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss'],
    providers: [DatePipe, CurrencyPipe],
})
export class ListOrderComponent implements OnInit {
    orderList: Order[] = [];
    orderListVM: OrderViewModel[] = [];
    totalPages: number;
    totalRows: number;
    listCurrrentIdOrderApproved: string[] = [];
    rq: SearchRequestOrder = {};

    keyWordSearch: string = '';
    constructor(
        private readonly orderClient: OrderClient,
        private datePipe: DatePipe,
        private currencyPipe: CurrencyPipe,
        private moneyPipe: MoneyPipe,
        private toastr: ToastrService
    ) {}

    public settings = {
        pager: {
            display: true,
            perPage: 5,
        },
        delete: {
            confirmDelete: true,
        },
        rowClassFunction: (row) => {
            if (row.data.statusString !== 'New') {
                return 'hide-action';
            } else {
                return '';
            }
        },
        actions: {
            add: false,
            edit: false,
            custom: [{ name: 'ourCustomAction' }],
        },
        columns: {
            index: {
                title: 'STT',
            },
            customer: {
                title: 'Customer',
            },
            email: {
                title: 'Email',
            },
            phoneNumber: {
                title: 'Phone',
            },
            address: {
                title: 'Address',
                width: '50%',
            },
            product: {
                title: 'Product Name',
                type: 'html',
                valuePrepareFunction: (product) => {
                    return `<a href= "/products/product-detail/${product.id}">${product.name}</a>`;
                },
            },
            quantity: {
                title: 'Quantity',
            },
            price: {
                title: 'Price',
                valuePrepareFunction: (price) => {
                    return this.moneyPipe.MoneyPipeVND(price);
                },
            },
            totalAmount: {
                title: 'Total Price',
                valuePrepareFunction: (totalAmount) => {
                    return this.moneyPipe.MoneyPipeVND(totalAmount);
                },
            },
            actualPrice: {
                title: 'Actual Total Price',
                valuePrepareFunction: (actualPrice) => {
                    return this.moneyPipe.MoneyPipeVND(actualPrice);
                },
            },
            createdDate: {
                title: 'Created Date',
                valuePrepareFunction: (createdDate) => {
                    return this.datePipe.transform(
                        new Date(createdDate),
                        'dd MMM yyyy'
                    );
                },
            },
            propertyString: {
                title: 'Property',
            },
            statusString: {
                title: 'Status',
            },
        },
    };

    ngOnInit() {
        this.loadData();
    }

    async loadData() {
        this.rq.pageSize = '100';
        this.rq.pageIndex = '0';
        this.rq.orderBy = 'createdDate|true';
        const response: PagedList<Order> = await this.orderClient
            .searchOrder(this.rq)
            .toPromise();

        this.orderList = response.items;
        this.totalPages = response.totalPages;
        this.totalRows = response.totalRows;
        // Custom data before render
        this.orderListVM = this.orderList.map(
            (order, index) => new OrderViewModel(order, index)
        );
    }

    async onDeleteConfirm(event) {
        this.RejectOrder(event.data.id);
    }

    async onCustomAction(event) {
        this.AcceptOrder(event.data.id);
    }

    AcceptOrder(id: string) {
        if (this.listCurrrentIdOrderApproved.length !== 0) {
            this.listCurrrentIdOrderApproved.map((idOrder) => {
                if (idOrder == id) {
                    return;
                }
            });
        }
        this.listCurrrentIdOrderApproved.push(id);
        this.orderClient.acceptOrder(id).subscribe(() => {
            this.toastr.success('Change Order Success!', 'Notification');
            this.loadData();
        });
    }

    RejectOrder(id: string) {
        this.orderClient.rejectOrder(id).subscribe(() => {
            this.toastr.success('Change Order Success!', 'Notification');
            this.loadData();
        });
    }
}
