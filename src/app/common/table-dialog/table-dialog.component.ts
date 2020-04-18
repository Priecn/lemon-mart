import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAddress } from '../models/address.model';

export interface TableDialogData<T> {
  columns: string[];
  data: T[];
}

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css']
})
export class TableDialogComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any[];

  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableDialogData<any>
  ) { }

  ngOnInit() {
    this.displayedColumns = this.data.columns;
    this.dataSource = this.data.data;
    console.log(this.data.data);
  }

  isDate(str: string): boolean {
    if (str) {
      return str.toString().indexOf('GMT+0530') > 0;
    }
    return false;
  }

  openAddressEditDialog(address: IAddress, index: number) {
    this.dialogRef.close({ action: 'EDIT', address, index });
  }

  openAddressDeleteDialog(address: IAddress, index: number) {
    this.dialogRef.close({ action: 'DELETE', address, index });
  }

  closeDialog() {
    this.dialogRef.close({ action: 'CANCEL' });
  }

  addAddress() {
    this.dialogRef.close({ action: 'ADD' });
  }
}
