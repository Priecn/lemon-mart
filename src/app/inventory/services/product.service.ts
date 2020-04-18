import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBatch } from '../models/batch.model';
import { IProduct, Product } from './../models/product.model';

export class TempProduct {
  constructor(public id: number, public name: string) { }
}

@Injectable()
export class ProductService {

  products = [];

  productUpdate: Subject<Product[]> = new BehaviorSubject<Product[]>(this.products);

  constructor(private http: HttpClient) { }

  public getAllProduct() {
    this.http.get<IProduct[]>(environment.serviceUrl + '/product/all').subscribe(
      res => {
        this.products = res;
        this.emitChangesInProducts();
      },
      err => console.log(`ERROR while fetching: ${JSON.stringify(err)}`)
    );
  }

  getAllProductsForGivenVendorId(vendorId: number) {
    return this.products.filter(p => vendorId in p.vendors);
  }

  getProductForId(id: number) {
    return this.products.filter(p => p.id === id)[0];
  }

  buildProductList() {
    const productList: Product[] = [];
    this.products.forEach((p: Product) => {
      productList.push(p);
    });
    return productList;
  }

  add(product: Product) {
    if (product.id !== null) {
      this.update(product);
    } else {
      product.id = null;
      this.http.post<Product>(environment.serviceUrl + '/product/add', product).subscribe(
        res => {
          this.products.push(res);
          this.emitChangesInProducts();
        },
        err => console.error('ERROR Occured!!' + JSON.stringify(err))
      );
    }
    return product;
  }

  remove(id: number) {
    this.http.delete<void>(environment.serviceUrl + '/product/delete/' + id).subscribe(
      res => {
        const index = this.products.findIndex(c => c.id === id);
        this.products.splice(index, 1);
        this.emitChangesInProducts();
      },
      err => console.error('ERROR Occured!!' + JSON.stringify(err))
    );
    this.emitChangesInProducts();
  }

  update(product: Product) {
    this.http.put<Product>(environment.serviceUrl + '/product/update', product).subscribe(
      res => {
        const index = this.products.findIndex(c => c.id === product.id);
        this.products[index] = res;
        this.emitChangesInProducts();
      },
      err => console.error('ERROR Occured!!' + JSON.stringify(err))
    );
  }

  emitChangesInProducts() {
    console.log(this.products.length);
    this.productUpdate.next(this.products);
  }

  addBatchToProduct(productId: number, batch: IBatch) {
    const index = this.products.findIndex(c => c.id === productId);
    if (!this.products[index].batches) {
      this.products[index].batches = [];
    }
    this.products[index].batches.push(batch);
    this.emitChangesInProducts();
  }

  getBatchesForProduct(productId: number) {
    const index = this.products.findIndex(c => c.id === productId);
    return this.products[index].batches;
  }
}
