import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductSlider } from '../../../../shared/data/slider';
import { Product as CustomProduct } from '../../../../api-clients/models/product.model';

@Component({
    selector: 'product-by-category',
    templateUrl: './product-by-category.component.html',
    styleUrls: ['./product-by-category.component.scss'],
})
export class ProductByCategoryComponent implements OnInit {
    public ProductSliderConfig: any = ProductSlider;
    public products: CustomProduct[] = [];
    @Input() categoryId;

    constructor(public productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getProductsByCategoryId(this.categoryId).subscribe((response: any) => {
            this.products = response;
        });
    }
}
