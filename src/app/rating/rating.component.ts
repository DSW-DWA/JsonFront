import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { TableServiceService } from '../services/table-service.service';

interface RatingTableItem {
  date: string;
  bad: number;
  chats: number;
  good: number;
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  displayedColumns: string[] = ['date', 'bad', 'chats', 'good'];
  dataSource: MatTableDataSource<RatingTableItem>;
  total: number;
  pageSize: number = 7;
  pageIndex: number = 0;
  allRecords: RatingTableItem[];

  constructor(
    private http: HttpClient,
    private tableService: TableServiceService) {
    this.dataSource = new MatTableDataSource<RatingTableItem>();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.tableService.getRating()
      .subscribe(data => {
        const records: RatingTableItem[] = [];
        Object.keys(data.records).forEach(date => {
          records.push({
            date,
            bad: data.records[date].bad,
            chats: data.records[date].chats,
            good: data.records[date].good
          });
        });
        this.dataSource.data = records.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
        this.allRecords = records;
        this.total = records.length;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.dataSource.data = this.allRecords.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }
}
