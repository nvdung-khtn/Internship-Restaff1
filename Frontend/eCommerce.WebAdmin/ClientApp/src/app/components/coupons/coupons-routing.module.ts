import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCouponComponent } from './list-coupon/list-coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { UserRole } from 'src/app/api-clients/models/user.model';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-coupon',
                component: ListCouponComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: UserRole.Admin,
                    title: 'List Coupons',
                    breadcrumb: 'List Coupons',
                },
            },
            {
                path: 'create-coupons',
                component: CreateCouponComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: UserRole.Admin,
                    title: 'Create Coupon',
                    breadcrumb: 'Create Coupons',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CouponsRoutingModule {}
