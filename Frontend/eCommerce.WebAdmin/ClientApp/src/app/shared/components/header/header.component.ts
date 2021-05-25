import { UserService } from 'src/app/shared/service/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenInfo } from 'src/app/api-clients/models/common.model';
import { NavService } from '../../service/nav.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public right_sidebar: boolean = false;
    public open: boolean = false;
    public openNav: boolean = false;
    public isOpenMobile: boolean;
    public urlAvatar: string;
    user: TokenInfo;
    public defaultUrlAvata = 'assets/images/dashboard/designer.jpg';

    @Output() rightSidebarEvent = new EventEmitter<boolean>();

    constructor(
        public navServices: NavService,
        private userService: UserService
    ) {
        this.userService.getUrlAvatarObs().subscribe(rs => {

            setTimeout(() => {
                this.urlAvatar = this.userService.getUrlAvatar();
            }, 2000);

        });
    }

    collapseSidebar() {
        this.open = !this.open;
        this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    }
    right_side_bar() {
        this.right_sidebar = !this.right_sidebar;
        this.rightSidebarEvent.emit(this.right_sidebar);
    }

    openMobileNav() {
        this.openNav = !this.openNav;
    }

    ngOnInit() {
        this.loadUser();
    }

    Logout() {
        this.userService.clearLocalStorage();
        this.userService.stopTokenTimer();
    }

    loadUser() {
        this.user = JSON.parse(localStorage.getItem('token_info'));
    }
}
