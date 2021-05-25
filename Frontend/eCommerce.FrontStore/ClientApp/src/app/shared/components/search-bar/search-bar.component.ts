import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "header-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  @ViewChild("searchTerm") searchTerm: ElementRef;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }
  onClick() {
    console.log("search Term", this.searchTerm.nativeElement.value);
    this.router.navigate(["/shop/collection/left/sidebar"], {
      queryParams: { searchTerm: this.searchTerm.nativeElement.value },
    });
    this.searchTerm.nativeElement.value = "";
  }
  onKeydown() {
    this.onClick();
  }
}
