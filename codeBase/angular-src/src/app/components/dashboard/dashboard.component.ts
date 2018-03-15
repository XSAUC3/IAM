import { Component, ViewContainerRef,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    color: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/application',  title: 'Applications',     icon:'folder_open',    color: 'orange' },
    { path: '/resources',    title: 'Resources',        icon:'extension',  color: 'green'  },
    { path: '/resourceTypes',title: 'Resource Type',    icon:'collections_bookmark',       color: 'blue'   },
    { path: '/attributes',   title: 'Attributes',       icon:'view_module',           color: 'red'    },
    { path: '/policies',     title: 'Policies',         icon:'description',    color: 'purple' },
    { path: '/roles',        title: 'Roles',            icon:'supervisor_account', color: 'black'  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  menuItems: any[];

  constructor() { 
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
  }
  
  
  ngOnInit() {
    
  }
  
}
