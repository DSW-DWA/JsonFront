import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

interface RatingsRecord {
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
  dataSource: MatTableDataSource<RatingsRecord>;
  total: number;
  pageSize: number = 7; // 1 week
  pageIndex: number = 0;
  allRecords: RatingsRecord[];

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<RatingsRecord>();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Replace the URL with your actual API endpoint
    this.http.get<any>('https://localhost:7050/Table/Rating')
      .subscribe(data => {
        const records: RatingsRecord[] = [];
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
