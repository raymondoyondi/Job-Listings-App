import { Component } from '@angular/core';
import { JobModel } from './models/job.model';
import { OnInit, OnDestroy } from '@angular/core';
import { JobService } from './services/job.service';
import { filter, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  jobs: JobModel[] = [];
  JobsCopy: JobModel[] = [];
  languages: string[] = [];

  jobSub!: Subscription;
  existingTagsSub!: Subscription;
  clearedTagsSub!: Subscription;

  constructor(private jobService: JobService) {}

  filteringTags: any = [];
  ngOnInit(): void {
    this.jobSub = this.jobService.getAllJobs().subscribe((resp: any) => {
      this.jobs = resp;
      this.JobsCopy = this.jobs;
      this.languages = resp.languages;
      //console.log(this.jobs);
    });

    this.existingTagsSub = this.jobService.existingTags.subscribe((res) => {
      //console.log(res);
      this.filteringTags = res;

      const filteringResult = this.filterFunc(
        this.filteringTags,
        this.jobs
      );
      //console.log(filteringResult);
      if (filteringResult.length === 0) {
        return
      } else {
        this.JobsCopy = filteringResult;
        console.log('got new tags!');
        console.log(this.JobsCopy);
      }
    });

    this.clearedTagsSub = this.jobService.clearedTags.subscribe((res) => {
      this.JobsCopy = this.jobs;
    });
  }

  filterFunc(filterTags: string[], jobs: JobModel[]) {
    //console.log(filterTags);

    let result = jobs.filter((job) => {
      //console.log(item.languages);
      if (
        filterTags.includes(job.level) ||
        filterTags.includes(job.role) ||
        filterTags.every((tag) => job.languages?.includes(tag))
      ) {
        return true;
      } else {
        return false;
      }
    });

    return result;
  }

  ngOnDestroy(): void {
    this.jobSub.unsubscribe();
    this.clearedTagsSub.unsubscribe();
    this.existingTagsSub.unsubscribe();
  }
}
