import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';
import { Observable } from 'rxjs';

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
  prodotti: [] = [];
  getProducts = this.storeService.getProducts();
  singleParamProduct = this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['id', 'titolo', 'prezzo', 'azioni'];
  dataSource = new MatTableDataSource(this.getProducts);
  dataSourceAdmin!: MatTableDataSource<any>;

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
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAdmin() {
    return localStorage.getItem('role') == 'Admin';
  }
}
