import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private role: 'private' | 'business' | null = null;

  constructor() {
    // 🔄 Restore from localStorage on service init
    this.authenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.role = localStorage.getItem('userRole') as 'private' | 'business' | null;
  }

  login(role: 'private' | 'business') {
    this.authenticated = true;
    this.role = role;
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  }

  logout() {
    this.authenticated = false;
    this.role = null;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  }

  isLoggedIn(): boolean {
    return this.authenticated;
  }

  getUserRole(): 'private' | 'business' | null {
    return this.role;
  }
}
