import { SearchRequest } from './../../../api-clients/models/common.model';
import { UserClient } from './../../../api-clients/user.client';
import { Component, OnInit } from '@angular/core';
import { userListDB } from 'src/app/shared/tables/list-users';
import { DatePipe } from '@angular/common';
import { UserRole } from 'src/app/api-clients/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss'],
    providers: [DatePipe],
})
export class ListUserComponent implements OnInit {
    public user_list = [];
    rq: SearchRequest = {};
    keyWordSearch: string = '';
    urlImageUser = "https://via.placeholder.com/150";
    constructor(
        private userClient: UserClient,
        private datePipe: DatePipe,
        private toastr: ToastrService
    ) {
        // this.user_list = userListDB.list_user;
    }

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
        actions: {
            custom: false,
            delete: false,
            add: false,
        },
        columns: {
            urlImage: {
                title: 'Avatar',
                type: 'html',
                valuePrepareFunction: (urlImage) => {
                    if (!urlImage) {
                        return (
                            `<img src="${this.urlImageUser}" height="100" width="100"/>`
                        );
                    }
                    return (
                        `<img src="${urlImage}" height="100" width="100"/>`
                    );
                },
                filter: false,
                editable: false,
            },
            username: {
                title: 'User name',
                type: 'email',
                editable: false,
            },
            firstName: {
                title: 'First Name',
                editable: false,
            },
            lastName: {
                title: 'Last Name',
                editable: false,
            },
            lockoutEnd: {
                title: 'Lockout End',
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select',
                        list: [
                            { value: '1', title: 'True' },
                            { value: '', title: 'False' },
                        ],
                    },
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
                editable: false,
            },
            createdBy: {
                title: 'Created By',
                editable: false,
            },
            lastUpdated: {
                title: 'Last Updated',
                valuePrepareFunction: (lastUpdated) => {
                    return this.datePipe.transform(
                        new Date(lastUpdated),
                        'dd MMM yyyy'
                    );
                },
                editable: false,
            },
            lastUpdatedBy: {
                title: 'Last Updated By',
                editable: false,
            },
            role: {
                title: 'Role',
                valuePrepareFunction: (role) => {
                    return UserRole[role];
                },
                editable: false,
            },
        },
    };

    ngOnInit() {
        this.loadData();
    }

    async loadData() {
        let users = await this.userClient.searchUsers(this.rq).toPromise();
        console.log('Users', users);
        this.user_list = users.items;
    }

    onDeleteConfirm(event) {
        this.disableEditAdmin(event);
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm(event) {
        this.disableEditAdmin(event);
        if (window.confirm('Are you sure you want to save?')) {
            console.log('save', event);
            event.confirm.resolve(event.newData);
            console.log(event.newData.id);
            console.log(event.newData.lockoutEnd);
            if (event.newData.lockoutEnd) {
                this.LockoutUser(event.newData.id);
            } else {
                this.UnlockoutUser(event.newData.id);
            }
            this.loadData();
        } else {
            event.confirm.reject();
        }
    }

    isLockout() {
        this.rq.isLockout = '1';
        this.loadData();
        console.log('lock');
    }

    isUnLockout() {
        this.rq.isLockout = '2';
        this.loadData();
        console.log('Unlock');
    }

    ShowAll() {
        this.rq.isLockout = '0';
        this.loadData();
        console.log('ShowAll');
    }

    async Search(keyWordSearch) {
        this.rq.searchTerm = keyWordSearch;
        this.loadData();
        this.keyWordSearch = '';
    }

    LockoutUser(id: string) {
        this.userClient.lockoutUser(id).subscribe(() => {
            this.toastr.success('Change User Success!', 'Notification');
            this.loadData();
        });
    }

    UnlockoutUser(id: string) {
        this.userClient.unlockoutUser(id).subscribe(() => {
            this.toastr.success('Change User Success!', 'Notification');
            this.loadData();
        });
    }

    disableEditAdmin(event) {
        if (event.data.role === UserRole.Admin) {
            this.loadData();
            this.toastr.warning('Admin is not edited');
            throw new Error('Admin is not edited');
        }
    }
}
