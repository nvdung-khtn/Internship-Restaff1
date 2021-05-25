import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "./models/category.model";
import { PagedList } from "./models/common.model";


@Injectable({
  providedIn: "root",
})

export class CategoryClient {
  constructor(private http: HttpClient) {}

  //Get all category
  getCategories(): Observable<PagedList<Category>> {
    const url = `${environment.apiUrl}/frontstore/api/Categories`;

    return this.http.get<PagedList<Category>>(url);
  }
}
