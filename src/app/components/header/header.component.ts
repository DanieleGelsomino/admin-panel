import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { AuthService } from '../../service/auth/auth.service';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  admin: Admin;
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  showLink() {
    return this.usersService.checkUser();
  }

  onLogout() {
    this.authService.logout();
  }

  isLogged() {
    this.authService.isLogged();
  }

  isAdmin() {
    return localStorage.getItem('role') == 'Admin';
  }
}
