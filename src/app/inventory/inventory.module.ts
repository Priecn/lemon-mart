import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared.module';
import { MaterialModule } from '../material.module';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductsComponent } from './products/products.component';
import { CategoryService } from './services/category.service';
import { ProductTypeService } from './services/product-type.service';
import { ProductService } from './services/product.service';
import { StockEntryComponent } from './stock-entry/stock-entry.component';


@NgModule({
  declarations: [
    InventoryComponent,
    InventoryDashboardComponent,
    StockEntryComponent,
    ProductsComponent,
    CategoriesComponent,
    ProductTableComponent,
    AddNewProductComponent
  ],
  entryComponents: [AddNewProductComponent],
  imports: [CommonModule, InventoryRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule],
  providers: [ProductService, CategoryService, ProductTypeService]
})
export class InventoryModule { }
