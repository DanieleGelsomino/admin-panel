import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from 'src/app/service/store.service';
import { ModalComponent } from '../components/modal/modal.component';
import { NotifierService } from '../../../service/notifier.service';

@Component({
  selector: 'app-store-table',
  templateUrl: './store-table.component.html',
  styleUrls: ['./store-table.component.scss'],
})
export class StoreTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'titolo',
    'prezzo',
    'categoria',
    'n_pezzi',
    'azioni',
  ];
  dataSource!: MatTableDataSource<any>;
  isLoading = false;

  @ViewChild('productsForm') form: NgForm;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private storeService: StoreService,
    private notifierService: NotifierService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAdmin() {
    return localStorage.getItem('role') == 'Admin';
  }

  addProduct() {
    this.dialog
      .open(ModalComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'Salva') {
          this.getAllProducts();
        }
      });
  }

  editProduct(row: any) {
    this.dialog
      .open(ModalComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'Modifica') {
          this.getAllProducts();
        }
      });
  }

  deleteProduct(id: number) {
    this.storeService.deleteProduct(id).subscribe({
      next: (res) => {
        this.notifierService.showNotification(
          'Prodotto Eliminato con successo',
          'ok',
          'success'
        );
        this.getAllProducts();
      },
      error: (res) => {
        this.notifierService.showNotification(
          'Eliminazione Prodotto non riuscita',
          'ok',
          'error'
        );
      },
    });
  }

  getAllProducts() {
    this.storeService.getProductsJSON().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        localStorage.setItem('result-data-products', JSON.stringify(res));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
