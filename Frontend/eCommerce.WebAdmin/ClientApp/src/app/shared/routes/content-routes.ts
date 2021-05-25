import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

export const content: Routes = [
    {
        path: 'dashboard',
        loadChildren: () =>
            import('../../components/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'products',
        loadChildren: () =>
            import('../../components/products/products.module').then(
                (m) => m.ProductsModule
            ),
        data: {
            breadcrumb: 'Products',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'sales',
        loadChildren: () =>
            import('../../components/sales/sales.module').then(
                (m) => m.SalesModule
            ),
        data: {
            breadcrumb: 'Sales',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'coupons',
        loadChildren: () =>
            import('../../components/coupons/coupons.module').then(
                (m) => m.CouponsModule
            ),
        data: {
            breadcrumb: 'Coupons',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'pages',
        loadChildren: () =>
            import('../../components/pages/pages.module').then(
                (m) => m.PagesModule
            ),
        data: {
            breadcrumb: 'Pages',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'media',
        loadChildren: () =>
            import('../../components/media/media.module').then(
                (m) => m.MediaModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'menus',
        loadChildren: () =>
            import('../../components/menus/menus.module').then(
                (m) => m.MenusModule
            ),
        data: {
            breadcrumb: 'Menus',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'users',
        loadChildren: () =>
            import('../../components/users/users.module').then(
                (m) => m.UsersModule
            ),
        data: {
            breadcrumb: 'Users',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'vendors',
        loadChildren: () =>
            import('../../components/vendors/vendors.module').then(
                (m) => m.VendorsModule
            ),
        data: {
            breadcrumb: 'Vendors',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'localization',
        loadChildren: () =>
            import('../../components/localization/localization.module').then(
                (m) => m.LocalizationModule
            ),
        data: {
            breadcrumb: 'Localization',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'reports',
        loadChildren: () =>
            import('../../components/reports/reports.module').then(
                (m) => m.ReportsModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'settings',
        loadChildren: () =>
            import('../../components/setting/setting.module').then(
                (m) => m.SettingModule
            ),
        data: {
            breadcrumb: 'Settings',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'inventory',
        loadChildren: () =>
            import('../../components/inventory/inventory.module').then(
                (m) => m.InventoryModule
            ),
        data: {
            breadcrumb: 'Inventory',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'orders',
        loadChildren: () =>
            import('../../components/orders/orders.module').then(
                (m) => m.OrdersModule
            ),
        data: {
            breadcrumb: 'Orders',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'categories',
        loadChildren: () =>
            import('../../components/categories/category.module').then(
                (m) => m.CategoryModule
            ),
        data: {
            breadcrumb: 'Categories',
        },
        canActivate: [AuthGuard],
    },
];
