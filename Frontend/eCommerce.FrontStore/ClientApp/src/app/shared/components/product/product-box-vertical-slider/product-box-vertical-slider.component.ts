import { PagedList } from "./../../../../api-clients/models/common.model";
import {
  Product,
  SearchRequestProduct,
} from "./../../../../api-clients/models/product.model";
import { Component, OnInit, Input } from "@angular/core";
import { NewProductSlider } from "../../../data/slider";
import { ProductService } from "../../../services/product.service";

@Component({
  selector: "app-product-box-vertical-slider",
  templateUrl: "./product-box-vertical-slider.component.html",
  styleUrls: ["./product-box-vertical-slider.component.scss"],
})
export class ProductBoxVerticalSliderComponent implements OnInit {
  @Input() title: string = "New Product"; // Default
  @Input() type: string = "fashion"; // Default Fashion

  public products: Product[];
  rq: SearchRequestProduct = {};

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(public productService: ProductService) {
    // this.productService.getProducts.subscribe(
    //   (response) =>
    //     (this.products = response.filter((item) => item.type == this.type))
    // );
    this.rq.sort = "lastUpdated|true";
    this.productService.searchProducts(this.rq).subscribe((res) => {
      this.products = res.items;
    });
  }

  ngOnInit(): void {}
}
