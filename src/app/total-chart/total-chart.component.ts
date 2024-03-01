import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

interface ChatRecord {
  date: string;
  total: number;
}

@Component({
  selector: 'app-total-chart',
  templateUrl: './total-chart.component.html',
  styleUrls: ['./total-chart.component.css']
})
export class TotalChartComponent implements OnInit {
  displayedColumns: string[] = ['date', 'total'];
  dataSource: MatTableDataSource<ChatRecord>;
  total: number;
  pageSize: number = 7; // 1 week
  pageIndex: number = 0;
  allRecords: ChatRecord[];

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<ChatRecord>();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Replace the URL with your actual API endpoint
    this.http.get<any>('https://localhost:7050/Table/TotalChats')
      .subscribe(data => {
        const records: ChatRecord[] = [];
        Object.keys(data.records).forEach(date => {
          records.push({ date, total: data.records[date].total });
        });
        this.total = records.length;
        this.dataSource.data = records.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
        this.allRecords = records;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.dataSource.data = this.allRecords.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }
}
