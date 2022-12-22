import { Injectable } from '@angular/core';
import users from '../data/users.json';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: any = users;
  user1: User = new User('dani', 'gelso', 'dani@gelso', '12345', 'User');
  admin: User = new User('admin', 'admin', 'admin@admin', '12345', 'Admin');
  allUser: User[] = [this.user1, this.admin];
  constructor(private router: Router) {}

  checkUser() {
    if (localStorage.getItem('email')) {
      return true;
    }
    return false;
  }

  getUsers() {
    return this.users;
  }

  getUser(index: number) {
    return this.users[index];
  }
}
