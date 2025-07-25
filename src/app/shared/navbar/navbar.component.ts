import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
    @Output() toggle = new EventEmitter<void>();



  constructor() { }

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

  logout() {
    console.log("Logging out...");
  }

}
