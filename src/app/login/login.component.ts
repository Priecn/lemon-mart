import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/role.enum';
import { UiService } from '../common/ui.service';

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
    private route: ActivatedRoute,
    private uiService: UiService
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
    this.uiService.showToast('Authenticating! Please wait...');
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .subscribe(
        authStatus => {
          if (authStatus.isAuthenticated) {
            this.router.navigate([
              this.redirectUrl || this.getNavigationUrl(authStatus.role),
            ]);
            this.uiService.showToast(
              `Hi, ${authStatus.sub}! (${authStatus.AUTHORITIES[0].split('_')[1]})`
            );
          }
        },
        error => (this.loginError = error)
      );
  }

  private getNavigationUrl(role: Role): string {
    switch (role) {
      case Role.User:
        return 'user';
      case Role.Manager:
        return 'manager';
      case Role.Cashier:
        return 'pos';
      case Role.Clerk:
        return 'inventory';
    }
  }
}
