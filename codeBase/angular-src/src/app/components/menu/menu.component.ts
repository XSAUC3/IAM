import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: any[];
  se_app_id = sessionStorage.getItem('app_id');
  componentVisibility :Boolean;
  constructor() { }

  ngOnInit() {
    if(this.se_app_id!=null||this.se_app_id!=undefined) {
        this.componentVisibility = true;
      }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
