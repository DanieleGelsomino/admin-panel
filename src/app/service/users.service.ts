import { Injectable } from '@angular/core';
import users from '../data/users.json';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: any = users;

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
