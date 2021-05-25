import { Component, OnInit, Input } from "@angular/core";
import { response } from "express";
import {
  Product as ProductAPI,
  ProductCategory,
  SearchRequestProduct,
} from "src/app/api-clients/models/product.model";
import { Product } from "../../../../shared/classes/product";
import { ProductService } from "../../../../shared/services/product.service";

@Component({
  selector: "app-related-product",
  templateUrl: "./related-product.component.html",
  styleUrls: ["./related-product.component.scss"],
})
export class RelatedProductComponent implements OnInit {
  @Input() type: ProductCategory;
  rq: SearchRequestProduct = {};
  public products: ProductAPI[];

  constructor(public productService: ProductService) {
    // this.productService.getProducts.subscribe(
    //   (response) =>
    //     (this.products = response.filter((item) => item.type == this.type))
    // );
  }

  ngOnInit(): void {
    this.getType();
    this.loadListProduct();
  }

  getType() {
    console.log(this.type);
    this.rq.categoryName = this.type.name;
  }

  loadListProduct() {
    this.productService.searchProducts(this.rq).subscribe((response) => {
      this.products = response.items;
      console.log("related-product", response);
    });
  }
}
