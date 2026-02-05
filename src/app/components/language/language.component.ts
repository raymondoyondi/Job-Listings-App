import { Component, Input, OnInit } from '@angular/core';
import { JobModel } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  @Input() currentJob: any;
  constructor(private jobService: JobService) {}

  ngOnInit(): void {}

  sendToTag(event: Event) {
    //console.log((<HTMLSpanElement>event.target).textContent);
    this.jobService.languageSelected.next(
      (<HTMLButtonElement>event.target).textContent!
    );
  }
}
