import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatOptionSelectionChange, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { ProductType } from '../models/product-type.model';
import { IProduct, Product } from '../models/product.model';
import { Tax } from '../models/tax-info.model';
import { CategoryService } from '../services/category.service';
import { ProductTypeService } from '../services/product-type.service';
import { ProductService } from '../services/product.service';
import { atleastOneIsRequired } from '../validators/custom-validators';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  productForm: FormGroup;
  categories: Category[];
  filteredCategories: Observable<Category[]>;
  productTypes: ProductType[] = [];
  selectedCategroy: Category;
  unit: string;

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    public dialogRef: MatDialogRef<AddNewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) { }

  ngOnInit() {
    this.categoryService.categoryListUpdate.subscribe(
      res => {
        this.categories = [...res];
        if (this.data) {
          this.selectedCategroy = this.categories.filter(c => c.name.toLowerCase() === this.data.category.name.toLowerCase())[0];
        }
        this.buildProductForm(this.data);
        this.filteredCategories = of(this.categories);
        this.filteredCategories = this.productForm.controls.category.valueChanges.pipe(
          map((value: string) => {
            const tempRes = this.categories.filter((p: Category) => p.name.toLowerCase().indexOf(value.toString().toLowerCase()) >= 0);
            if (tempRes.length === 0) {
              const tempProduct = new Category(null, value);
              tempRes.push(tempProduct);
            }
            return tempRes;
          })
        );
      },
      err => console.log(`AddNewProductComponent::ngOnInit ${err}`)
    );

    this.productTypeService.productTypeListUpdate.subscribe(
      res => this.productTypes = [...res],
      err => console.log(`error while fetching product type list ${err}`)
    );
  }

  buildProductForm(product?: IProduct) {
    // console.log(product);
    this.productForm = this.formBuilder.group({
      id: new FormControl(product && product.id || null),
      name: new FormControl(product && product.name || '', [Validators.required]),
      genericName: new FormControl(product && product.genericName || '', [Validators.required]),
      category: new FormControl(product && product.category && product.category.name || '', [Validators.required]),
      companyName: new FormControl(product && product.companyName || '', [Validators.required]),
      productType: new FormControl(product && product.productType || '', [Validators.required]),
      location: new FormControl(product && product.location || '', [Validators.required]),
      quantityInAPack: new FormControl(product && product.quantityInAPack || '', [Validators.required]),
      taxInfo: this.formBuilder.group({
        hsn: new FormControl(product && product.hsn || ''),
        gst: new FormControl(product && product.gst || ''),
      }, { validator: [atleastOneIsRequired(Validators.required)] })
    });
  }

  addProduct() {
    console.log(this.selectedCategroy);
    const tax = new Tax(null, this.productForm.controls.taxInfo.get('hsn').value,
      this.productForm.controls.taxInfo.get('gst').value);
    const product = new Product();
    product.id = this.productForm.controls.id.value;
    product.name = this.productForm.controls.name.value;
    product.genericName = this.productForm.controls.genericName.value;
    product.category = this.selectedCategroy;
    product.companyName = this.productForm.controls.companyName.value;
    product.productType = this.productForm.controls.productType.value;
    product.location = this.productForm.controls.location.value;
    product.quantityInAPack = this.productForm.controls.quantityInAPack.value;
    product.gst = this.productForm.controls.taxInfo.get('gst').value;
    product.hsn = this.productForm.controls.taxInfo.get('hsn').value;
    console.log(product);
    const createdProduct = this.productService.add(product);
    this.dialogRef.close(createdProduct);
  }

  categorySelected(event: MatOptionSelectionChange, category: Category) {
    console.log(this.selectedCategroy);
    if (event.source.selected) {
      this.selectedCategroy = category;
    }
  }

  typeSelected(event: MatOptionSelectionChange, type: ProductType) {
    if (event.source.selected) {
      this.unit = type.unit.toString();
    }
  }

  compareProductTypes(pt1: ProductType, pt2: ProductType): boolean {
    return pt1.id === pt2.id && pt1.name === pt2.name;
  }
}
