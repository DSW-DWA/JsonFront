import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { DurationComponent } from './duration/duration.component';
import { RouterModule, Routes } from '@angular/router';
import { RatingComponent } from './rating/rating.component';
import { ResponseTimeComponent } from './response-time/response-time.component';
import { TagComponent } from './tag/tag.component';
import { TotalChartComponent } from './total-chart/total-chart.component';

const routes: Routes = [
  { path: 'duration', component: DurationComponent},
  { path: 'rating', component: RatingComponent },
  { path: 'response-time', component: ResponseTimeComponent },
  { path: 'tag', component: TagComponent },
  { path: 'total-chart', component: TotalChartComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DurationComponent,
    RatingComponent,
    ResponseTimeComponent,
    TagComponent,
    TotalChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
