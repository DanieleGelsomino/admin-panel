import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/service/notifier.service';
import { StoreService } from 'src/app/service/store.service';
import { UsersService } from '../../../service/users.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'cognome',
    'eta',
    'email',
    'indirizzo',
    'azioni',
  ];
  user: any;

  dataSource!: MatTableDataSource<any>;
  isLoading = false;
  @ViewChild('productsForm') form: NgForm;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private usersService: UsersService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
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

  getAllUsers() {
    this.usersService.getUsersJSON().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        localStorage.setItem('result-data-users', JSON.stringify(res));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProduct(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: (res) => {
        this.notifierService.showNotification(
          'Prodotto Eliminato con successo',
          'ok',
          'success'
        );
        this.getAllUsers();
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

  editUser(id: number) {
    this.router.navigate(['/utenti/modifica/' + id]);
  }
}
