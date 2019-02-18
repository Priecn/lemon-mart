import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private displayLogin: boolean;
  constructor(private authService: AuthService) {}

  username: string;
  role: string;
  ngOnInit() {
    this.authService.authStatus.subscribe(authStatus => {
      this.displayLogin = authStatus.isAuthenticated;
      this.username = authStatus.sub;
      this.role = authStatus.AUTHORITIES[0];
    });
  }

  public displayLoginForm(): boolean {
    return this.displayLogin;
  }
}
