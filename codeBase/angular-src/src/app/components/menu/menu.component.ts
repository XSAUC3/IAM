import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard',    title: 'Dashboard',             icon:'dashboard', class: '' },
    { path: 'application',  title: 'Applications',          icon:'folder_open', class: '' },
    { path: 'attributes',   title: 'Attributes',            icon:'view_module', class: '' },
    { path: 'resourceTypes',title: 'Resource Type',         icon:'collections_bookmark', class: '' },
    { path: 'resources',    title: 'Resources',             icon:'extension', class: '' },
    { path: 'roles',        title: 'Roles',                 icon:'supervisor_account', class: '' },
    { path: 'policies',     title: 'Policies',              icon:'description', class: '' },
    { path: 'adminUsers',   title: 'Administrative Users',  icon:'account_box', class: 'active-pro' },
];

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
    this.menuItems = ROUTES.filter(menuItem => menuItem);
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
