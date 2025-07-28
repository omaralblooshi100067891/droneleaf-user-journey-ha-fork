import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
    @Output() toggle = new EventEmitter<void>();



  constructor(private layoutService: LayoutService) { }

  ngOnInit() {}
   dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('ion-icon') && !target.closest('.relative')) {
      this.dropdownOpen = false;
    }
  }

  toggleSidebar() {
    console.log('Toggle clicked ✅');
    this.layoutService.toggleSidebar();
  }

  logout() {
    console.log("Logging out...");
  }

}
