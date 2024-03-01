import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { TableServiceService } from '../services/table-service.service';

interface TagTableItem {
  date: string;
  tags: string;
}
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  displayedColumns: string[] = ['date', 'tags'];
  uniqueTags: string[] = [];
  dataSource: MatTableDataSource<TagTableItem>;
  total: number;
  pageSize: number = 7; // 1 week
  pageIndex: number = 0;
  allRecords: TagTableItem[];

  constructor(
    private http: HttpClient,
    private tableService: TableServiceService 
    ) {
    this.dataSource = new MatTableDataSource<TagTableItem>();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.tableService.getTag()
      .subscribe(data => {
        const records: TagTableItem[] = [];
        Object.keys(data.records).forEach(date => {
          let tags = ""
          Object.keys(data.records[date]).forEach(tag => {
            tags = tags + `${tag} - ${data.records[date][tag]}, `
          });
          tags = tags.slice(0, -2);
          records.push({ date, tags });
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
