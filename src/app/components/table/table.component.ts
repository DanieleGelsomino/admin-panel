import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ModalComponent } from '../../page/store/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import products from '../../../assets/data/products.json';
import { NgForm, FormGroup } from '@angular/forms';
import { StoreService } from '../../service/store.service';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit {
  products: any = products;
  @Input() data!: any;
  @Input() paramData!: string;
  @Input() singleData!: any;
  @Input() columns!: string[];
  @Input() elements!: any;
  displayedColumns: string[] = this.columns;
  // dataSource: string[] = this.data;
  dataSource!: MatTableDataSource<any>;
  isLoading = false;

  @ViewChild('productsForm') form: NgForm;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private storeService: StoreService,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProducts();
  }
  ngAfterViewInit(): void {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
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
    this.data.filter = filterValue.trim().toLowerCase();
  }

  isAdmin() {
    return localStorage.getItem('role') == 'Admin';
  }

  openDialog() {
    this.dialog.open(ModalComponent), {};
  }

  getAllProducts() {
    this.storeService.getProductsJSON().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllUsers() {
    this.usersService.getUsersJSON().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
