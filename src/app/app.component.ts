import { Component, OnInit } from '@angular/core';
import { StorageDataService } from './service/storage-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-panel';

  constructor(private storageDataService: StorageDataService) {}
  ngOnInit(): void {
    this.storageDataService.getJSON().subscribe((res) => {
      console.log(res);
    });
  }
}
