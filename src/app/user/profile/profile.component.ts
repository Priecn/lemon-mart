import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/auth/role.enum';
import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  userError = '';
  currentUserRole = Role.None;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authStatus.subscribe(authStatus => {
      this.currentUserRole = authStatus.role;
    });

    this.userService.getCurrentUser().subscribe(user => {
      this.buildUserForm(user);
    });
    this.buildUserForm();
  }

  buildUserForm(user?: IUser) {
    console.log((user && user.role) || '');
    this.userForm = this.formBuilder.group({
      email: [
        {
          value: (user && user.email) || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        [Validators.required, Validators.email],
      ],
      username: new FormControl((user && user.username) || '', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      firstName: [
        (user && user.firstName) || '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      lastName: [(user && user.lastName) || ''],
      role: [
        {
          value: (user && user.role) || Role.None,
          disabled: this.currentUserRole !== Role.Manager,
        },
        [Validators.required],
      ],
    });
  }

  async save(formGroup: FormGroup) {
    this.userService
      .updateUser(formGroup.value)
      .subscribe(res => this.buildUserForm(res), err => (this.userError = err));
  }
}
