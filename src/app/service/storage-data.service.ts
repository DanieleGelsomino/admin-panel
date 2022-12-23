import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageDataService implements OnInit {
  userURL = 'users.json';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  public getJSON() {
    return this.http.get('http://localhost:4200/' + this.userURL);
  }
}
