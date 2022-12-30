import { Injectable } from '@angular/core';
import users from '../../assets/data/users.json';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: any = users;
  user1: User = new User('dani', 'gelso', 'dani@gelso', '12345', 'User');
  admin: User = new User('admin', 'admin', 'admin@admin', '12345', 'Admin');
  allUser: User[] = [this.user1, this.admin];
  userURL = '../../assets/data/users.json';
  constructor(private router: Router, private http: HttpClient) {}

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

  getRole() {
    return localStorage.getItem('role') == 'Admin';
  }

  getUserById(id: number) {
    return this.http.get<any>(this.userURL + id);
  }

  // JSON Server
  getUsersJSON() {
    return this.http.get<any>('http://localhost:3000/users/');
  }

  getUserJSONById(id: number) {
    return this.http.get<any>('http://localhost:3000/users/' + id);
  }

  addUser(data: any) {
    return this.http.post<any>('http://localhost:3000/users/', data);
  }

  updateUser(id: number, data: any) {
    return this.http.put<any>('http://localhost:3000/users/' + id, data);
  }

  deleteUser(id: number) {
    return this.http.delete<any>('http://localhost:3000/users/' + id);
  }
}
