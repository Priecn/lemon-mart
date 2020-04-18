import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../../common/confirmation/confirmation.component';
import { TableDialogComponent } from '../../common/table-dialog/table-dialog.component';
import { AddNewProductComponent } from '../add-new-product/add-new-product.component';
import { Batch } from '../models/batch.model';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  constructor(private productService: ProductService,
    public router: Router, public dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'name', 'genericName', 'category', 'companyName', 'productType', 'batches', 'hsn', 'gst', 'action'];
  dataSource: Product[];

  ngOnInit() {
    this.productService.getAllProduct();
    this.productService.productUpdate.subscribe(
      (res: Product[]) => {
        this.dataSource = [...res];
      },
      err => console.error(`ERROR: ProductTableComponent::ngOnInit - ${err}`)
    );
  }

  update(product: Product) {
    console.log(product);
    this.openDialog(product);
  }

  delete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '30%',
      data: `Are you sure, you want to delete product: ${product.name}?`,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.productService.remove(product.id);
      }
    });
  }

  openDialog(data?: Product): void {
    data ? console.log(JSON.stringify(data)) : console.log('Empty');
    const dialogRef = this.dialog.open(AddNewProductComponent, {
      width: '50%',
      data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openBatchDialog(productId: number): void {

    const batches: Batch[] = this.productService.getBatchesForProduct(productId);

    const dataToDisplay = {
      columns: ['id', 'batchNumber', 'manufacturingDate', 'expiryDate',
        'supplier', 'buyingPrice', 'netBuyingPrice', 'sellingPrice', 'mrp', 'boxes', 'units'],
      data: batches
    };
    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '80%',
      data: dataToDisplay,
      panelClass: 'table-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
