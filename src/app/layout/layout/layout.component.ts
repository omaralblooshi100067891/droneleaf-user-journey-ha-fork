import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  {
isMobile: boolean = false;
  isSidebarOpen: boolean = true;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.isMobile$.subscribe((val) => (this.isMobile = val));
    this.layoutService.isSidebarOpen$.subscribe(
      (val) => (this.isSidebarOpen = val)
    );
  }

  handleMenuClick() {
    if (this.isMobile) {
      this.layoutService.closeSidebar();
    }
  }

  closeSidebar() {
    this.layoutService.closeSidebar();
  }

}
