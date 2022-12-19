import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  products: any;
  product: any;
  isSingleProduct!: boolean;
  isLoading = false;
  singleParamProduct = this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['id', 'titolo', 'prezzo', 'dettagli'];
  dataSource = new MatTableDataSource(this.storeService.getProducts());

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    if (this.singleParamProduct) {
      this.isSingleProduct = true;
      this.product = this.storeService.getProduct(
        parseInt(this.singleParamProduct!)
      );
    } else {
      this.isSingleProduct = false;
      this.loadProducts();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadProducts() {
    this.isLoading = true;
    setTimeout(() => {
      this.products = this.storeService.getProducts();
      this.isLoading = false;
    }, 1000);
  }
}
