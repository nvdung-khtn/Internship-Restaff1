import { UserRole } from './../../api-clients/models/user.model';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-user',
                component: ListUserComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: UserRole.Admin,
                    title: 'User List',
                    breadcrumb: 'User List',
                },
            },
            {
                path: 'create-user',
                component: CreateUserComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: UserRole.Admin,
                    title: 'Create User',
                    breadcrumb: 'Create User',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
