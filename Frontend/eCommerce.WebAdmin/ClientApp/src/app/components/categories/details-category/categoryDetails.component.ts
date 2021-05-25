import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Category, LableOptions } from "src/app/api-clients/models/_index";
import { CategoryClient } from "src/app/api-clients/_index";
import { ConfirmService } from "src/app/shared/service/confirm.service";
import { UserService } from "src/app/shared/service/user.service";

@Component({
    selector: 'app-category-details',
    templateUrl: './categoryDetails.component.html',
    styleUrls: ['./categoryDetails.component.scss'],
    providers: [CategoryClient]
})

export class CategoryDetailsComponent implements OnInit {

    public id: string = "";

    public properties: LableOptions[] = [];

    public name: string = "";

    constructor(private toastr: ToastrService,
        private route: ActivatedRoute,
        private confimService: ConfirmService,
        private userService: UserService,
        private categoryClient: CategoryClient) {

        this.id = this.route.snapshot.paramMap.get('categoryId');
        this.getData();
    }

    getData() {
        this.categoryClient.getCategoryDetailsById(this.id).subscribe(rs => {
            this.name = rs.name;
            this.properties = rs.lableOptions;
        })
    }

    public settings = {

        edit: {
            confirmSave: this.userService.getTokenInfo().role == 'Admin',
        },
        add: {
            confirmCreate: this.userService.getTokenInfo().role == 'Admin',
        },
        delete: {
            confirmDelete: this.userService.getTokenInfo().role == 'Admin',
        },
        actions: {
            edit: this.userService.getTokenInfo().role == 'Admin',
            delete: this.userService.getTokenInfo().role == 'Admin',
            add: this.userService.getTokenInfo().role == 'Admin'
        },
        columns: {
            lable: {
                title: 'Label',
            },
            options: {
                title: 'Options'
            }
        }
    };

    ngOnInit(): void {

    }

    onCreateConfirm(e): void {
        if (this.properties.length >= 5) {
            this.toastr.error('Property can not more 5', 'Erro');
            return;
        }

        let data: LableOptions[] = [];
        data.push(e.newData);
        this.properties.map(v => data.push(v));
        this.updateCategory(data, e);


    }

    onEditConfirm(e): void {

        let action = () => {
            let data: LableOptions[] = [];
            this.properties.map(v => {
                if (v.lable != e.data.lable || v.options != e.data.options) {
                    data.push(v);
                }
                if (v.lable == e.data.lable && v.options == e.data.options) {
                    data.push(e.newData);
                }
            });
            this.updateCategory(data, e);
        }

        this.confimService.confirmAction(action, "edit");

    }

    onDeleteConfirm(e): void {

        let action = () => {
            let i = 0;
            let data: LableOptions[] = [];
            this.properties.map(v => {
                if (v.lable != e.data.lable || v.options != e.data.options) {
                    data.push(v);
                }
            });
            this.updateCategory(data, e);
        }

        this.confimService.confirmAction(action, "delete");

    }

    updateCategory(p: LableOptions[], e: any) {
        let category: Category = new Category(this.id, this.name, p);

        this.categoryClient.updateCategory(category).subscribe(() => {
            e.confirm.resolve(e.newData);
            this.getData();
            this.toastr.success('Change Category Success!', 'Notification');

        });
    }
}