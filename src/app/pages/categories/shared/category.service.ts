import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Category} from './category.model';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string = 'api/categories';

  constructor(private sharedService: SharedService) {

   }

   getAll(): Observable<Category[]>{
    return this.sharedService.getAll(this.apiPath, this.jsonDataToCategories);
  }

  getById(id:any): Observable<Category>{
    return this.sharedService.getById(id, this.apiPath, this.jsonDataToCategory);
  }

  create(category: Category): Observable<Category>{
    return this.sharedService.create(category, this.apiPath, this.jsonDataToCategory)
  }

  update(category: Category): Observable<Category>{
    return this.sharedService.update(category, this.apiPath);
  }

  delete(id: number): Observable<any>{
    return this.sharedService.delete(id, this.apiPath)
  }

   // PRRIVATE METHODS

    private jsonDataToCategories( jsonData: any[]): Category[]{
      const categories: Category[] = [];
      jsonData.forEach(element => categories.push( element as Category));
      return categories;
    }

    private jsonDataToCategory( jsonData: any): Category{
      return jsonData as Category;
    }
}
