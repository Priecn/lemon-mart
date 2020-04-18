
import { Batch } from './batch.model';
import { Category } from './category.model';
import { ProductType } from './product-type.model';
import { Tax } from './tax-info.model';

export interface IProduct {
    id: number;
    name: string;
    genericName: string;
    category: Category;
    companyName: string;
    productType: ProductType;
    quantityInAPack: number;
    batches: Batch[];
    gst: number;
    hsn: string;
    location: string;
    vendors: number[];
}

export class Product {
  public id: number;
  public name: string;
  public genericName: string;
  public category: Category;
  public companyName: string;
  public productType: ProductType;
  public quantityInAPack: number;
  public batches: Batch[];
  public gst: number;
  public hsn: string;
  public location: string;
  public vendors: number[];
  constructor(product?: IProduct) {
    this.id = product && product.id || null;
    this.name = product && product.name || null;
    this.genericName = product && product.genericName || null;
    this.category = product && product.category || null;
    this.companyName = product && product.companyName || null;
    this.productType = product && product.productType || null;
    this.batches = product && product.batches || null;
    this.gst = product && product.gst || null;
    this.hsn = product && product.hsn || null;
    this.location = product && product.location || null;
    this.vendors = product && product.vendors || [];
    this.quantityInAPack = product && product.quantityInAPack || 0;
  }
}
