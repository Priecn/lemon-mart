import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  categories: Category[] = [];
  public categoryListUpdate: Subject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {
    this.getAllCategory();
  }

  getAllCategory() {
    this.http.get<Category[]>(environment.serviceUrl + '/category/all').subscribe(
      (res) => {
        this.categories = [...res];
        this.emitChangesInCategoryList();
      },
      (err) => console.error(`ERROR Occured while fetching categories: ${JSON.stringify(err)}`)
    );
  }

  findCategoryByName(catName: string): Category {
    const filteredCategories: Category[] = this.categories.filter(c => c.name.toLowerCase() === catName.toLowerCase());
    if (filteredCategories.length === 0) {
      return null;
    }
    return filteredCategories[0];
  }

  addCategory(category: Category) {
    const fetchedCategory = this.findCategoryByName(category.name);
    if (fetchedCategory === null) {
      this.http.post<Category>(environment.serviceUrl + '/category/add', category).subscribe(
        (res) => {
          this.categories.push(res);
          this.emitChangesInCategoryList();
        },
        (err) => console.error(`ERROR Occured while adding category: ${err}`)
      );
    } else {
      console.log(`category already present: ${fetchedCategory}`);
    }
  }

  removeCategory(id: number) {
    this.http.delete<void>(`${environment.serviceUrl}/category/remove/${id}`).subscribe(
      (res) => {
        const index = this.categories.findIndex(c => c.id === id);
        this.categories.splice(index, 1);
        this.emitChangesInCategoryList();
      },
      (err) => console.error(`ERROR Occured while deleting category: ${err}`)
    );
  }

  updateCategory(category: Category) {
    this.http.put<Category>(`${environment.serviceUrl}/category/update`, category).subscribe(
      (res) => {
        const index = this.categories.findIndex(c => c.id === res.id);
        this.categories[index].name = res.name;
        this.emitChangesInCategoryList();
      },
      (err) => console.error(`ERROR Occured while updating category: ${err}`)
    );
  }

  emitChangesInCategoryList() {
    this.categoryListUpdate.next(this.categories);
  }
}
