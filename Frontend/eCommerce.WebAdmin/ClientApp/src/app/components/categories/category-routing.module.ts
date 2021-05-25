import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from 'src/app/api-clients/models/user.model';
import { AuthGuard } from 'src/app/auth.guard';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryDetailsComponent } from './details-category/categoryDetails.component';
import { CategoryComponent } from './list-category/category.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-category',
                component: CategoryComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: UserRole.Admin,
                    title: 'Category List',
                    breadcrumb: 'Category List',
                },
            },
            {
                path: 'create-category',
                component: CreateCategoryComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: UserRole.Admin,
                    title: 'Create Category',
                    breadcrumb: 'Create Category',
                },
            },
            {
                path: 'details/:categoryId',
                component: CategoryDetailsComponent,
                data: {
                    title: 'Category Details',
                    breadcrumb: 'Category Details',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryhRoutingModule {}
