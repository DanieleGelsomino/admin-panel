import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin = false;
  constructor(private router: Router) {}
  signIn() {
    this.router.navigate(['/utenti']);
  }

  login() {
    this.router.navigate(['/utenti']);
  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigate(['/home']);
  }

  isRoleAdmin() {
    return this.isAdmin;
  }
}
