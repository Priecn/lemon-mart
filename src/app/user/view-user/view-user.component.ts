import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { setRole } from 'src/app/common/common';
import { IUser, User } from '../user/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  @Input() user: IUser;
  currentUser = new User();
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.user) {
      this.currentUser = User.BuildUser(this.user);
    }
    this.route.params.subscribe(params => {
      this.currentUser = User.BuildUser(this.route.snapshot.data.user);
      this.currentUser.role = setRole(this.currentUser.authorities[0]);
    });
  }
}
