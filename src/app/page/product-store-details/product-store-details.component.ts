import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-store-details',
  templateUrl: './product-store-details.component.html',
  styleUrls: ['./product-store-details.component.scss'],
})
export class ProductStoreDetailsComponent implements OnInit {
  @Input() data!: any;
  constructor() {}

  ngOnInit(): void {}
}
