import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { TableServiceService } from '../services/table-service.service';

interface ChatTableItem {
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
  dataSource: MatTableDataSource<ChatTableItem>;
  total: number;
  pageSize: number = 7;
  pageIndex: number = 0;
  allRecords: ChatTableItem[];

  constructor(
    private http: HttpClient,
    private tableService: TableServiceService
    ) {
    this.dataSource = new MatTableDataSource<ChatTableItem>();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.tableService.getTotalChats()
      .subscribe(data => {
        const records: ChatTableItem[] = [];
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
