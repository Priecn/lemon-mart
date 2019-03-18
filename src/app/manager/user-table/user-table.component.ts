import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/user/user/user';
import { UserService } from 'src/app/user/user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['fullname', 'username', 'email', 'role', 'enabled'];
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;
  hasError = false;
  errorText = '';
  skipLoading = false;

  search = new FormControl('', [Validators.minLength(2)]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    if (this.skipLoading) {
      return;
    }
    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.pipe(debounceTime(1000))
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService.getUsers(
            this.paginator.pageSize,
            this.search.value,
            this.paginator.pageIndex
          );
        }),
        map((data: { total: number; items: IUser[] }) => {
          this.isLoadingResults = false;
          this.hasError = false;
          this.resultsLength = data.total;
          return data.items;
        }),
        catchError(err => {
          this.isLoadingResults = false;
          this.hasError = err;
          return of([]);
        })
      )
      .subscribe(data => (this.dataSource.data = data));
  }
}
