import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StorageDataService implements OnInit {
  userURL = '../../assets/data/users.json';
  productURL = '../../assets/data/products.json';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  getUsersJSON() {
    return this.http.get<object[]>(this.userURL).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      })
    );
  }

  getProductsJSON() {
    return this.http.get<object[]>(this.productURL).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      })
    );
  }
}
