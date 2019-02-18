import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material';
import { Observable } from 'rxjs';

import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

@Injectable()
export class UiService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  showToast(message: string, action = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, config || { duration: 7000 });
  }

  showDialog(
    title: string,
    content: string,
    okText = 'OK',
    cancelText?: string,
    customConfig?: MatDialogConfig
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(
      SimpleDialogComponent,
      customConfig || {
        width: '300px',
        data: { title, content, okText, cancelText },
      }
    );

    return dialogRef.afterClosed();
  }
}
