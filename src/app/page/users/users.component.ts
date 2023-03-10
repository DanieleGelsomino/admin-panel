import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UsersService } from 'src/app/service/users.service';
import { StorageDataService } from '../../service/storage-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any;
  user: any;
  isSingleUser!: boolean;
  isLoading = false;
  singleParamUser = this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'email', 'azioni'];
  dataSource = new MatTableDataSource(this.usersService.getUsers());

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storageDataService: StorageDataService
  ) {}

  ngOnInit(): void {
    if (this.singleParamUser) {
      this.isSingleUser = true;
      this.user = this.usersService.getUser(parseInt(this.singleParamUser!));
    } else {
      this.isSingleUser = false;
    }
  }

  isAdmin() {
    this.authService.isRoleAdmin();
  }

  isAdminRole() {
    return localStorage.getItem('role') == 'Admin';
  }
}
