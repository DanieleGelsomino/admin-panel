import { Injectable, ViewChild } from '@angular/core';
import products from '../../assets/data/products.json';
import { NgForm, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageDataService } from './storage-data.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  products: any = products;
  productURL = '../../assets/data/products.json';
  constructor(
    private http: HttpClient,
    private storageDataService: StorageDataService
  ) {}

  getProducts() {
    return this.products;
  }

  getProduct(index: number) {
    return this.products[index];
  }
  getProductsJSON() {
    return this.http.get<any>('http://localhost:3000/products/');
  }

  getProductById(id: number) {
    return this.http.get<any>('http://localhost:3000/products/' + id);
  }

  addProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/products/', data);
  }

  updateProduct(id: number, data: any) {
    return this.http.put<any>('http://localhost:3000/products/' + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>('http://localhost:3000/products/' + id);
  }
}
