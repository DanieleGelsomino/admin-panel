import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

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
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'email', 'dettagli'];
  dataSource = new MatTableDataSource(this.usersService.getUsers());

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.singleParamUser) {
      this.isSingleUser = true;
      this.user = this.usersService.getUser(parseInt(this.singleParamUser!));
    } else {
      this.isSingleUser = false;
      // this.loadUsers();
    }
  }

  loadUsers() {
    this.isLoading = true;
    setTimeout(() => {
      this.users = this.usersService.getUsers();
      this.isLoading = false;
    }, 1000);
  }
}
