import { Component, OnInit } from '@angular/core';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "..../advert", title: 'İlanlar',  icon: 'design_app', class: '' },
  

];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  
  menuItems: any[];
  
  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);    
  }
  

}

