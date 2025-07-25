import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  {
isSidebarOpen = false;
  isMobile = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  constructor() { }

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen.bind(this));
  }

  checkScreen() {
    this.isMobile = window.innerWidth < 768;
  }

}
