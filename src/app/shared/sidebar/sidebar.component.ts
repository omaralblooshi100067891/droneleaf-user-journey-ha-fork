import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  @Input() isMobileOpen = false;
  @Output() close = new EventEmitter<void>();

  closeSidebar() {
    this.close.emit();
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/account-type']);
  }
}
