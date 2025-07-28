import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

interface SidebarItem {
  label: string;
  link: string;
  iconPath: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isMobileOpen = false;
  userRole: 'private' | 'business' | null = null;
  @Output() close = new EventEmitter<void>();
  isSidebarOpen = false;
 @Input() isMobile: boolean = false; // ✅ ADD THIS



toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

closeSidebar() {
  this.isSidebarOpen = false;
}
  sidebarItems: SidebarItem[] = [];

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') as 'private' | 'business';
    this.setSidebarItems();
    this.checkScreen();
    window.addEventListener('resize', this.checkScreen.bind(this));
  }

  handleMenuClick() {
    // Auto-close sidebar only if on mobile
    if (this.isMobileOpen) {
      this.closeSidebar();
    }
  }

  checkScreen() {
    this.isMobile = window.innerWidth < 768;
  }

  setSidebarItems() {
    const common: SidebarItem[] = [
      {
        label: 'Notifications',
        link: '/notifications',
        iconPath: '../../../assets/svgs/private/notification.png',
      },
    ];

    const privateItems: SidebarItem[] = [
      {
        label: 'Home',
        link: '/dashboard',
        iconPath: '../../../assets/svgs/private/home-2.svg',
      },
      {
        label: 'Drone Library',
        link: '/drone-library',
        iconPath: '../../../assets/svgs/private/folder-open.svg',
      },
      {
        label: 'Mission Management',
        link: '/missions',
        iconPath: '../../../assets/svgs/private/directbox-notif.svg',
      },
      {
        label: 'AI Dojo',
        link: '/reports',
        iconPath: '../../../assets/svgs/private/main-component.png',
      },
    ];

    const businessItems: SidebarItem[] = [
      {
        label: 'Business Dashboard',
        link: '/dashboard',
        iconPath: '../../../assets/svgs/private/home-2.svg',
      },
      {
        label: 'Drone Library',
        link: '/teams',
        iconPath: '../../../assets/svgs/private/folder-open.svg',
      },
      {
        label: 'Mission Management',
        link: '/fleet',
        iconPath: '../../../assets/svgs/private/directbox-notif.svg',
      },
      {
        label: 'AI Dojo',
        link: '/settings',
        iconPath: '../../../assets/svgs/private/main-component.png',
      },
      {
        label: 'User Profile',
        link: '/settings',
        iconPath: '../../../assets/svgs/private/profile-2user.png',
      },
      {
        label: 'User Management',
        link: '/settings',
        iconPath: '../../../assets/svgs/business/people.svg',
      },
    ];

    this.sidebarItems =
      this.userRole === 'private'
        ? [...privateItems, ...common]
        : [...businessItems, ...common];
  }

  logout() {
    localStorage.clear();
    window.location.href = '/auth/account-type';
  }
}
