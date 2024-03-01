import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { TableServiceService } from '../services/table-service.service';

interface ResponseTableItem {
  date: string;
  count: number;
  response_time: number;
}

@Component({
  selector: 'app-response-time',
  templateUrl: './response-time.component.html',
  styleUrls: ['./response-time.component.css']
})
export class ResponseTimeComponent implements OnInit {
  displayedColumns: string[] = ['date', 'count', 'response_time'];
  dataSource: MatTableDataSource<ResponseTableItem>;
  total: number;
  pageSize: number = 7;
  pageIndex: number = 0;
  allRecords: ResponseTableItem[];

  constructor(
    private http: HttpClient,
    private tableService: TableServiceService
    ) {
    this.dataSource = new MatTableDataSource<ResponseTableItem>();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.tableService.getResponseTime()
      .subscribe(data => {
        const records: ResponseTableItem[] = [];
        Object.keys(data.records).forEach(date => {
          records.push({
            date,
            count: data.records[date].count,
            response_time: data.records[date].responseTime
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
