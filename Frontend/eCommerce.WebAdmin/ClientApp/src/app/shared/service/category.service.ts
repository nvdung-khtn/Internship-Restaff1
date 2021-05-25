import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from 'src/app/api-clients/models/category.model';
import { environment } from "src/environments/environment";

@Injectable()
export class CategoryService {


    constructor(private http: HttpClient) {

    }

    getListCategory(): Observable<Category> {
        return this.http.get<Category>(`${environment.apiUrl}/ProductCategories/`)
            .pipe(
                map((respone: any) => respone)
            )
    }

    addCategory(category): Observable<Category> {
        return this.http.post<Category>(`${environment.apiUrl}/ProductCategories/`, category)
    }

    deleteCategory(id: string): Observable<void> {
        return this.http.delete<any>(`${environment.apiUrl}/ProductCategories?id=` + id)
    }

    updateCategory(id: string, category): Observable<Category> {
        return this.http.put<Category>(`${environment.apiUrl}/ProductCategories?id=` + id, category)
    }
}