import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { JobModel } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  jobSub?: Subscription;

  languageSelected = new Subject<string>();
  languageDeleted = new Subject<string>();

  existingTags = new Subject<string[]>();
  clearedTags = new Subject<boolean>();

  getAllJobs(): Observable<JobModel[]> {
    return this.http.get<JobModel[]>('assets/data.json');
  }
}
