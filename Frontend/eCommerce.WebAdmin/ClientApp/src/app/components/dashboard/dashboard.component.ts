import { UserService } from 'src/app/shared/service/user.service';
import { Order } from 'src/app/api-clients/models/order.model';
import { OrderClient } from 'src/app/api-clients/order.client';
import { Component, OnInit } from '@angular/core';
import * as chartData from '../../shared/data/chart'; // khac gi import chartData thoi
import { doughnutData, pieData } from '../../shared/data/chart';
import { DashboardClient } from 'src/app/api-clients/Dashboard.client';
import { SearchRequestOrder } from 'src/app/api-clients/models/order.model';
import { OrderViewModel } from '../orders/order.viewModel';
import * as HighCharts from 'highcharts';
import { MoneyPipe } from 'src/app/shared/service/moneyPipe';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public doughnutData = doughnutData;
    public pieData = pieData;
    rq: SearchRequestOrder = {};
    orders: Order[];
    header = [];
    orderListVM: OrderViewModel[] = [];
    data = [];
    dataApi;
    sumEarningsValue: string = '';
    constructor(
        private _dashBoard: DashboardClient,
        private _orderClient: OrderClient,
        private moneyPipe: MoneyPipe,
        private _userService: UserService
    ) {
        Object.assign(this, { doughnutData, pieData });
    }

    // events
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }

    ngOnInit() {
        this.loadSumEarnings();
        this.getCountComment();
        this.getCountUser();
        this.getCountProduct();
        this.getLastedOrder();
        this.getCategories();
        this.getProducts();
        this.getRevenueMonthly();
    }

    public chart3 = chartData.chart3;

    sumEarnings: number;
    countProduct: number;
    countUser: number;
    countComment: number;
    loadSumEarnings() {
        // this.sumEarnings = this._dashBoard.getSumEarnings();
        console.log(
            'sads',
            this._dashBoard.getSumEarnings().subscribe((res) => {
                this.sumEarnings = Number(res);
                this.sumEarningsValue = this.moneyPipe.MoneyPipeVND(this.sumEarnings)
            })
        );
    }



    getCountProduct() {
        this._dashBoard.getCountProduct().subscribe((res) => {
            this.countProduct = Number(res);
        });
    }

    getCountComment() {
        this._dashBoard.getCountComment().subscribe((res) => {
            this.countComment = Number(res);
        });
    }

    getCountUser() {
        this._dashBoard.getCountUser().subscribe((res) => {
            this.countUser = Number(res);
        });
    }

    getCategories() {
        this._dashBoard.getStatisticsCategory().subscribe((res) => {
            this.pieChartBrowser(res);
        });
    }

    getProducts() {
        this._dashBoard.getStatisticsProduct().subscribe((res) => {
            this.barChartBrowser(res);
        });
    }

    getLastedOrder() {
        // Get 5 Orders Lastest
        this.rq.orderBy = 'createdDate|true';
        this.rq.pageSize = '5';
        this.rq.pageIndex = '0';
        this._orderClient.searchOrder(this.rq).subscribe((res) => {
            this.orders = res.items;
            this.orderListVM = this.orders.map(
                (order, index) => new OrderViewModel(order, index)
            );
        });
    }

    pieChartBrowser(response) {
        HighCharts.chart('pieChart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title: {
                text: 'Statistics Categories',
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                },
            },
            series: [
                {
                    name: 'Brands',
                    colorByPoint: true,
                    type: undefined,
                    data: response,
                },
            ],
        });
    }

    barChartBrowser(response) {
        HighCharts.chart('barChart', {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Statistics Products',
            },
            tooltip: {
                pointFormat: '{point.y:.1f}</b>',
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif',
                    },
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quantity',
                },
            },
            series: [
                {
                    name: 'Product Name',
                    colorByPoint: true,
                    type: undefined,
                    data: response,
                },
            ],
        });
    }

    lineChartBrowser(data) {
        let option = {
            chart: {
                type: 'line',
            },
            title: {
                text: 'Revenue Order',
            },
            tooltip: {
                pointFormat: '{point.y:.1f}</b>',
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ],
            },
            yAxis: {
                title: {
                    text: 'Revenue Monthly',
                },
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                    },
                    enableMouseTracking: false,
                },
            },
            series: data,
        };
        HighCharts.chart('lineChart', option);
    }

    getRevenueMonthly() {
        this._dashBoard.getRevenueMonthly().subscribe((res) => {
            console.log(res);
            this.lineChartBrowser(res);
        });
    }
}
