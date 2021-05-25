import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "app-myloader",
  templateUrl: "./myloader.component.html",
  styleUrls: ["./myloader.component.scss"],
})
export class MyloaderComponent implements OnInit {
  loading: boolean;
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });
  }

  ngOnInit(): void {}
}
