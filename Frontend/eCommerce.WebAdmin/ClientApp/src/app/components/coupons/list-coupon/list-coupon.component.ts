import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CouponClient } from 'src/app/api-clients/coupon.client';
import { PagedList } from 'src/app/api-clients/models/common.model';
import { Coupon } from 'src/app/api-clients/models/coupon.model';
import { ConfirmService } from 'src/app/shared/service/confirm.service';
import { MoneyPipe } from 'src/app/shared/service/moneyPipe';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../smart-table-datepicker/smart-table-datepicker.component';
import { CouponViewModel } from '../coupon.viewModel';


@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
  providers: [DatePipe, CurrencyPipe, PercentPipe],
})
export class ListCouponComponent implements OnInit {

  couponList: Coupon[] = [];
  couponListVM: CouponViewModel[] = [];
  totalPages: number;
  totalRows: number;

  constructor(
    private readonly couponClient: CouponClient,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private percentPipe: PercentPipe,
    private toastr: ToastrService,
    private moneyPipe: MoneyPipe,
    private confirmService: ConfirmService,
  ) { }

  public settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    delete: {
      confirmDelete: true,
    },
    edit: {
      confirmSave: true,
    },
    add: {
      confirmCreate: true,
    },

    columns: {
      code: {
        title: 'Code',
      },
      name: {
        title: 'Name',
      },
      description: {
        title: 'Description',
      },
      startDate: {
        title: 'Start Date',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '300px',
        sortDirection: 'desc',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      },
      endDate: {
        title: 'End Date',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '300px',
        sortDirection: 'desc',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      },
      minPrice: {
        title: 'Min Price',
        valuePrepareFunction: (minPrice) => {
          return this.moneyPipe.MoneyPipeVND(minPrice);
        },
      },
      value: {
        title: 'Discount',
        valuePrepareFunction: (discount) => {
          return discount + '%';
        },
      },
    },
  };

  async loadData() {
    const response: PagedList<Coupon> = await this.couponClient
      .getAllCoupon()
      .toPromise();

    this.couponList = response.items;
    this.totalPages = response.totalPages;
    this.totalRows = response.totalRows;
    // Custom data before render
    this.couponListVM = this.couponList.map(
      (coupon) => new CouponViewModel(coupon)
    );

  }

  onCreateConfirm(event): void {
    var data = {
      "name": event.newData.name,
      "description": event.newData.description,
      "startDate": event.newData.startDate,
      "endDate": event.newData.endDate,
      "minPrice": event.newData.minPrice,
      "value": event.newData.value,
      "code": event.newData.code,
    };

    let name = event.newData.name;
    if (name == '') {
      this.toastr.error('Name không được để trống', 'Error');
      return;
    }

    let code = event.newData.code;
    if (code == '') {
      this.toastr.error('Code không được để trống', 'Error');
      return;
    }

    let description = event.newData.description;
    if (description == '') {
      this.toastr.error('Description không được để trống', 'Error');
      return;
    }

    let minPrice = event.newData.minPrice;
    if (!RegExp('^\\d+$').exec(minPrice)) {
      this.toastr.error('Minprice phải là số', 'Error');
      return;
    }
    if (minPrice < 0) {
      this.toastr.error('Minprice không được phép âm', 'Error');
      return;
    }
    if (minPrice == '') {
      this.toastr.error('Minprice không được để trống', 'Error');
      return;
    }

    let value = event.newData.value;
    if (!RegExp('^\\d+$').exec(value)) {
      this.toastr.error('Discount phải là số', 'Error');
      return;
    }
    if (value < 0) {
      this.toastr.error('Discount không được phép âm', 'Error');
      return;
    }
    if (value == '') {
      this.toastr.error('Discount không được để trống', 'Error');
      return;
    }

    let startDate = event.newData.startDate;
    let endDate = event.newData.endDate;
    if (endDate < startDate) {
      this.toastr.error('Ngày bắt đầu phải trước ngày kết thúc', 'Error');
      return;
    }

    this.couponClient.addCoupon(data).subscribe(() => {
      event.confirm.resolve(event.newData);
      this.toastr.success('Change Coupon Success!', 'Notification');
      this.loadData();
    })
  }

  onDeleteConfirm(event) {
    let action = () => {
      this.couponClient.deleteCoupon(event.data.id).subscribe(() => {
        this.toastr.success('Change Coupon Success!', 'Notification');
        this.loadData();
      })
    }

    this.confirmService.confirmAction(action, "delete");
  }

  onEditConfirm(event) {
    var data = {
      "code": event.newData.code,
      "name": event.newData.name,
      "description": event.newData.description,
      "startDate": event.newData.startDate,
      "endDate": event.newData.endDate,
      "minPrice": event.newData.minPrice,
      "value": event.newData.value,
    };

    let name = event.newData.name;
    if (name == '') {
      this.toastr.error('Name không được để trống', 'Error');
      return;
    }

    let code = event.newData.code;
    if (code == '') {
      this.toastr.error('Code không được để trống', 'Error');
      return;
    }

    let description = event.newData.description;
    if (description == '') {
      this.toastr.error('Description không được để trống', 'Error');
      return;
    }

    let minPrice = event.newData.minPrice;
    if (!RegExp('^\\d+$').exec(minPrice)) {
      this.toastr.error('Minprice phải là số', 'Error');
      return;
    }
    if (minPrice < 0) {
      this.toastr.error('Minprice không được phép âm', 'Error');
      return;
    }
    if (minPrice == '') {
      this.toastr.error('Minprice không được để trống', 'Error');
      return;
    }

    let value = event.newData.value;
    if (!RegExp('^\\d+$').exec(value)) {
      this.toastr.error('Discount phải là số', 'Error');
      return;
    }
    if (value < 0) {
      this.toastr.error('Discount không được phép âm', 'Error');
      return;
    }
    if (value == '') {
      this.toastr.error('Discount không được để trống', 'Error');
      return;
    }

    let startDate = event.newData.startDate;
    let endDate = event.newData.endDate;
    if (endDate < startDate) {
      this.toastr.error('Ngày bắt đầu phải trước ngày kết thúc', 'Error');
      return;
    }
    let flag = true;
    let action = () => {
      this.couponListVM.map(category => {
        this.couponClient.updateCoupon(event.data.id, data).subscribe(() => {
          if (flag) {
            flag = false;
            this.toastr.success('Change Coupon Success!', 'Notification');
          }
          this.loadData();
        })
      });
    }
    
    this.confirmService.confirmAction(action, "edit");
  }


  ngOnInit() {
    this.loadData();
  }


}
