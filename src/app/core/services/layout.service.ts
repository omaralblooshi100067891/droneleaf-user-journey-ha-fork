import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _isMobile$ = new BehaviorSubject<boolean>(false);
  private _isSidebarOpen$ = new BehaviorSubject<boolean>(false);

  isMobile$ = this._isMobile$.asObservable();
  isSidebarOpen$ = this._isSidebarOpen$.asObservable();

  constructor() {
    this.detectScreen();
    window.addEventListener('resize', () => this.detectScreen());
  }

  private detectScreen() {
    const isMobile = window.innerWidth < 768;
    this._isMobile$.next(isMobile);
    if (!isMobile) {
      this._isSidebarOpen$.next(true); // desktop: always open
    }
  }

  toggleSidebar() {
    this._isSidebarOpen$.next(!this._isSidebarOpen$.value);
  }

  openSidebar() {
    this._isSidebarOpen$.next(true);
  }

  closeSidebar() {
    this._isSidebarOpen$.next(false);
  }
}
