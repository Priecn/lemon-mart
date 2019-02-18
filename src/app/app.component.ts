import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'lemon-mart';
  isLoggedIn: boolean;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService,
    public media: MediaObserver
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/lemon.svg')
    );
  }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(authStatus => {
      setTimeout(() => {
        this.isLoggedIn = authStatus.isAuthenticated;
      }, 0);
    });
  }
}
