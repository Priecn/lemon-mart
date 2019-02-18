import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/common/ui.service';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: [],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.uiService.showToast('Login out! Please wait...');
    this.authService.logout();
    this.router.navigate(['/']);
    this.uiService.showToast('Done!');
  }
}
