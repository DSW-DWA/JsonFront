import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { TableServiceService } from '../services/table-service.service';

export interface DurationTableItem {
  date: string;
  agents_chatting_duration: number;
  count: number;
  duration: number;
}

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
  displayedColumns: string[] = ['date', 'agents_chatting_duration', 'count', 'duration'];
  dataSource: MatTableDataSource<DurationTableItem>;
  total: number;
  pageSize: number = 7;
  pageIndex: number = 0;
  allRecords: DurationTableItem[];

  constructor(
    private http: HttpClient, 
    private tableService: TableServiceService
    ) {
    this.dataSource = new MatTableDataSource<DurationTableItem>();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.tableService.getDuration()
      .subscribe(data => {
        const records: DurationTableItem[] = [];
        Object.keys(data.records).forEach(date => {
          records.push({
            date,
            agents_chatting_duration: data.records[date].agentsChattingDuration,
            count: data.records[date].count,
            duration: data.records[date].duration
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
