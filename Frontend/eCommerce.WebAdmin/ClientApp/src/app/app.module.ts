import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { PagesModule } from './components/pages/pages.module';
import { MediaModule } from './components/media/media.module';
import { MenusModule } from './components/menus/menus.module';
import { VendorsModule } from './components/vendors/vendors.module';
import { UsersModule } from './components/users/users.module';
import { LocalizationModule } from './components/localization/localization.module';
import { SettingModule } from './components/setting/setting.module';
import { ReportsModule } from './components/reports/reports.module';
import { AuthModule } from './components/auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ExceptionInterceptor } from './interceptor/exception.interceptor';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { CategoryModule } from './components/categories/category.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent,
} from './components/smart-table-datepicker/smart-table-datepicker.component';
import { MyLoaderComponent } from './shared/components/my-loader/my-loader.component';
import { LoaderService } from './shared/service/loader.service';
import { LoaderInterceptorService } from './interceptor/loader-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        SmartTableDatepickerComponent,
        SmartTableDatepickerRenderComponent,
        MyLoaderComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        AppRoutingModule,
        DashboardModule,
        SettingModule,
        ReportsModule,
        AuthModule,
        SharedModule,
        LocalizationModule,
        ProductsModule,
        SalesModule,
        VendorsModule,
        CouponsModule,
        PagesModule,
        MediaModule,
        MenusModule,
        UsersModule,
        FormsModule,
        CategoryModule,
        ToastContainerModule,
        ToastrModule.forRoot(),
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ExceptionInterceptor,
            multi: true,
        },
        LoaderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptorService,
            multi: true,
        },
    ],
    entryComponents: [
        SmartTableDatepickerComponent,
        SmartTableDatepickerRenderComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
