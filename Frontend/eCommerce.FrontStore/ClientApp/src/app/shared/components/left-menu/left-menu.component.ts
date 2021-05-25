import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { CategoryClient } from 'src/app/api-clients/category.client';

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
    public menuItems: any[];
    s;

    constructor(
        private router: Router,
        public navServices: NavService,
        private categoryClient: CategoryClient
    ) {
        this.router.events.subscribe((event) => {
            this.navServices.mainMenuToggle = false;
        });
    }

    ngOnInit(): void {
        this.categoryClient.getCategories().subscribe((response) => {
            this.menuItems = response.items;
        });
    }

    leftMenuToggle(): void {
        this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
    }

    onHover(menuItem) {
        if (window.innerWidth > 1200 && menuItem) {
            document.getElementById('unset').classList.add('sidebar-unset');
        } else {
            document.getElementById('unset').classList.remove('sidebar-unset');
        }
    }
}
