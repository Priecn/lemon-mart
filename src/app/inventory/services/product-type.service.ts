import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductType } from '../models/product-type.model';

@Injectable()
export class ProductTypeService {
  productTypeList: ProductType[] = [];
  public productTypeListUpdate: Subject<ProductType[]> = new BehaviorSubject<ProductType[]>([]);

  constructor(private http: HttpClient) {
    this.getAllProductType();
  }

  getAllProductType() {
    this.http.get<ProductType[]>(environment.serviceUrl + '/product-type/all').subscribe(
      (res) => {
        this.productTypeList = [...res];
        this.emitChangesInList();
      },
      (err) => console.error(`ERROR Occured while fetching product type list: ${JSON.stringify(err)}`)
    );
  }

  findByName(name: string): ProductType {
    const filteredList: ProductType[] = this.productTypeList.filter(c => c.name.toLowerCase() === name.toLowerCase());
    if (filteredList.length === 0) {
      return null;
    }
    return filteredList[0];
  }

  addProductType(productType: ProductType) {
    const fetchedProductType = this.findByName(productType.name);
    if (fetchedProductType === null) {
      this.http.post<ProductType>(environment.serviceUrl + '/product-type/add', productType).subscribe(
        (res) => {
          this.productTypeList.push(res);
          this.emitChangesInList();
        },
        (err) => console.error(`ERROR Occured while adding product type: ${err}`)
      );
    } else {
      console.log(`product type already present: ${fetchedProductType}`);
    }
  }

  emitChangesInList() {
    this.productTypeListUpdate.next(this.productTypeList);
  }
}
