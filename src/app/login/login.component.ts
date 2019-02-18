import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;
  redirectUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl')));
  }

  ngOnInit() {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(50)],
      ],
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .subscribe(
        authStatus => {
          if (authStatus.isAuthenticated) {
            console.log(authStatus.AUTHORITIES[0] === 'ROLE_USER');
            if (authStatus.AUTHORITIES[0].toUpperCase() === 'ROLE_USER') {
              this.router.navigate(['user']);
            } else if (authStatus.AUTHORITIES[0].toUpperCase() === 'ROLE_MANAGER') {
              this.router.navigate(['manager']);
            } else if (authStatus.AUTHORITIES[0].toUpperCase() === 'ROLE_CASHIER') {
              this.router.navigate(['pos']);
            } else {
              this.router.navigate(['inventory']);
            }
          }
        },
        error => (this.loginError = error)
      );
  }
}
