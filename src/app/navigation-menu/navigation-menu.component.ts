import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: 'navigation-menu.component.html',
  styles: [
    `
      .active-link {
        font-weight: bold;
        border-left: 3px solid green;
      }
    `,
  ],
})
export class NavigationMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
