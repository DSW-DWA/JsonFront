import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkArea } from 'src/environments/work-area';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JsonFront';
  screenWidth: number = WorkArea.Width;
}
