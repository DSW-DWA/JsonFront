import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Duration } from 'src/Models/duration';
import { EndPoints } from 'src/environments/end-points';
import { Rating } from 'src/Models/rating';
import { ResponseTime } from 'src/Models/response-time';
import { Tag } from 'src/Models/tag';
import { TotalChats } from 'src/Models/total-chats';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  constructor(private http: HttpClient) {}

  getDuration(): Observable<Duration> {
    return this.http.get<Duration>(`${environment.apiUrl}/${EndPoints.Duration}`);
  }

  getRating(): Observable<Rating> {
    return this.http.get<Rating>(`${environment.apiUrl}/${EndPoints.Rating}`);
  }

  getResponseTime(): Observable<ResponseTime> {
    return this.http.get<ResponseTime>(`${environment.apiUrl}/${EndPoints.ResponseTime}`);
  }

  getTag(): Observable<Tag> {
    return this.http.get<Tag>(`${environment.apiUrl}/${EndPoints.Tag}`);
  }

  getTotalChats(): Observable<TotalChats> {
    return this.http.get<TotalChats>(`${environment.apiUrl}/${EndPoints.TotalChart}`);
  }
}
