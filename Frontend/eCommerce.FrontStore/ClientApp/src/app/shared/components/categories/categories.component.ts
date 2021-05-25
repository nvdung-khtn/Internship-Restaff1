import { CategoryClient } from "src/app/api-clients/category.client";
import { Category } from "src/app/api-clients/models/category.model";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../classes/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  public products: Product[] = [];
  public collapse: boolean = true;
  categories: Category[] = [];

  constructor(
    public productService: ProductService,
    private categoryClient: CategoryClient
  ) {}

  ngOnInit(): void {
    this.categoryClient.getCategories().subscribe((category) => {
      this.categories = category.items;
      console.log(category.items);
    });
  }
}
