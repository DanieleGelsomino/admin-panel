import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @Input() data!: any;
  @Input() paramData!: string;
  @Input() singleData!: any;
  @Input() columns!: string[];
  @Input() elements!: any;
  displayedColumns: string[] = this.columns;
  dataSource: string[] = this.data;
  isLoading = false;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
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

  addFormRows() {
    this.dataSource.push();
  }
}
