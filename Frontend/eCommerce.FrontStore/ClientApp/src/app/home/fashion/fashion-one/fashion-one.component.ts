import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { of } from 'rxjs';
import { Category } from 'src/app/api-clients/models/category.model';
import { CategoryClient } from 'src/app/api-clients/category.client';

@Component({
    selector: 'app-fashion-one',
    templateUrl: './fashion-one.component.html',
    styleUrls: ['./fashion-one.component.scss'],
})
export class FashionOneComponent implements OnInit {
    //public products: Product[] = [];
    products: any;
    categories: Category[];
    public productCollections: any[] = [];

    constructor(
        public productService: ProductService,
        private categoryClient: CategoryClient
    ) {
        // this.productService.getProducts.subscribe((response) => {
        //     console.log('products: ', response);
        //     this.products = response.filter((item) => item.type == 'fashion');
        //     // Get Product Collection
        //     this.products.filter((item) => {
        //         item.collection.filter((collection) => {
        //             const index = this.productCollections.indexOf(collection);
        //             if (index === -1) this.productCollections.push(collection);
        //         });
        //     });
        // });

        this.categoryClient
            .getCategories()
            .subscribe((response: any) => (this.categories = response.items));
    }

    public ProductSliderConfig: any = ProductSlider;

    public sliders = [
        {
            title: 'welcome to fashion',
            subTitle: 'Men fashion',
            image: 'assets/images/slider/1.jpg',
        },
        {
            title: 'welcome to fashion',
            subTitle: 'Women fashion',
            image: 'assets/images/slider/2.jpg',
        },
        {
            image: 'assets/images/slider/3.jpg',
        },
        {
            image: 'assets/images/slider/4.jpg',
        },
        {
            image: 'assets/images/slider/5.jpg',
        },
        {
            image: 'assets/images/slider/6.jpg',
        },
    ];
    // Blog
    public blog = [
        {
            image: 'assets/images/blog/1.jpg',
            date: '25 January 2018',
            title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
            by: 'John Dio',
        },
        {
            image: 'assets/images/blog/2.jpg',
            date: '26 January 2018',
            title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
            by: 'John Dio',
        },
        {
            image: 'assets/images/blog/3.jpg',
            date: '27 January 2018',
            title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
            by: 'John Dio',
        },
        {
            image: 'assets/images/blog/4.jpg',
            date: '28 January 2018',
            title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
            by: 'John Dio',
        },
    ];

    // Logo
    public logo = [
        {
            image: 'assets/images/logos/1.png',
        },
        {
            image: 'assets/images/logos/2.png',
        },
        {
            image: 'assets/images/logos/3.png',
        },
        {
            image: 'assets/images/logos/4.png',
        },
        {
            image: 'assets/images/logos/5.png',
        },
        {
            image: 'assets/images/logos/6.png',
        },
        {
            image: 'assets/images/logos/7.png',
        },
        {
            image: 'assets/images/logos/8.png',
        },
    ];

    async ngOnInit() {}

    // Product Tab collection
    getCollectionProducts(collection) {
        return this.products.filter((item) => {
            if (item.collection.find((i) => i === collection)) {
                return item;
            }
        });
    }
}
