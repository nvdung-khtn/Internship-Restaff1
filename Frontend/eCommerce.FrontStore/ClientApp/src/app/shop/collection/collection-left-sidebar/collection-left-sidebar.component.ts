import { Observable } from "rxjs";
import { PagedList } from "./../../../api-clients/models/common.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { ProductService } from "../../../shared/services/product.service";
import {
  SearchRequestProduct,
  Product as ProductAPI,
} from "src/app/api-clients/models/product.model";

@Component({
  selector: "app-collection-left-sidebar",
  templateUrl: "./collection-left-sidebar.component.html",
  styleUrls: ["./collection-left-sidebar.component.scss"],
})
export class CollectionLeftSidebarComponent implements OnInit {
  public grid: string = "col-xl-3 col-md-6";
  public layoutView: string = "grid-view";
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 990000;
  public tags: any[] = [];
  public category: string;
  // public pageNo: number = 0;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;
  totalItem: number;
  products: PagedList<ProductAPI>;
  rq: SearchRequestProduct = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.rq.searchTerm = params["searchTerm"] ? params["searchTerm"] : "";
      this.rq.categoryName = params["category"] ? params["category"] : "";
      this.rq.minPrice = params["minPrice"] ? params["minPrice"] : 0;
      this.rq.maxPrice = params["maxPrice"] ? params["maxPrice"] : 990000;
      this.rq.sort = params["sortBy"] ? params["sortBy"] : "";
      this.rq.pageSize = "8";
      this.rq.pageIndex = params["page"]
        ? (params["page"] - 1).toString()
        : "0";
      this.loadListProduct();
      // this.GetTotalItem();
    });
  }

  // Paginate Products
  pagingProduct(totalRow) {
    this.paginate = this.productService.getPager(
      totalRow,
      Number(this.rq.pageIndex),
      Number(this.rq.pageSize)
    ); // get paginate object from service
    console.log("Paginate", this.paginate);
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: tags,
        queryParamsHandling: "merge", // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor("products"); // Anchore Link
      });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { sortBy: value ? value : null },
        queryParamsHandling: "merge", // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor("products"); // Anchore Link
      });
  }

  // Remove Tag
  removeTag(tag) {
    this.brands = this.brands.filter((val) => val !== tag);
    this.colors = this.colors.filter((val) => val !== tag);
    this.size = this.size.filter((val) => val !== tag);

    let params = {
      brand: this.brands.length ? this.brands.join(",") : null,
      color: this.colors.length ? this.colors.join(",") : null,
      size: this.size.length ? this.size.join(",") : null,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: "merge", // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor("products"); // Anchore Link
      });
  }

  // Clear Tags
  removeAllTags() {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: {},
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor("products"); // Anchore Link
      });
  }

  // product Pagination
  setPage(page: number) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { page: page },
        queryParamsHandling: "merge", // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor("products"); // Anchore Link
      });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == "list-view") this.grid = "col-lg-12";
    else this.grid = "col-xl-3 col-md-6";
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  //Get Product
  loadListProduct() {
    this.productService.searchProducts(this.rq).subscribe((response) => {
      this.products = response;
      this.pagingProduct(response.totalRows);
      console.log(
        "return products res",
        this.products,
        "lenght product",
        this.products.items.length
      );
      console.log("rq", this.rq);
      console.log("check error", this.products.items);
    });
  }

  clearSearchRequest() {
    this.rq = {};
  }
}
