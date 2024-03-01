import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

interface TagsRecord {
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
  dataSource: MatTableDataSource<TagsRecord>;
  total: number;
  pageSize: number = 7; // 1 week
  pageIndex: number = 0;
  allRecords: TagsRecord[];

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<TagsRecord>();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Replace the URL with your actual API endpoint
    this.http.get<any>('https://localhost:7050/Table/Tag')
      .subscribe(data => {
        const records: TagsRecord[] = [];
        Object.keys(data.records).forEach(date => {
          let tags = ""
          Object.keys(data.records[date]).forEach(tag => {
            tags = tags + `${tag} - ${data.records[date][tag]}, `
          });
          tags = tags.slice(0, -1);
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
