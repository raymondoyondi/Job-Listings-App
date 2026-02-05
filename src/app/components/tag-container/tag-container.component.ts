import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-tag-container',
  templateUrl: './tag-container.component.html',
  styleUrls: ['./tag-container.component.scss'],
})
export class TagContainerComponent implements OnInit, OnDestroy {
  constructor(private jobService: JobService) {}

  currentTags: string[] = [];

  languageSelectedSub!: Subscription;

  ngOnInit(): void {
    this.languageSelectedSub = this.jobService.languageSelected.subscribe(
      (lang) => {
        if (this.currentTags.includes(lang.trim())) {
          return;
        } else {
          this.currentTags.push(lang.trim());
         // console.log('Current tags : ');
         // console.log(this.currentTags);
          this.jobService.existingTags.next(this.currentTags);
          //console.log(this.currentTags);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.languageSelectedSub.unsubscribe();
  }

  removeFromTag(id: number) {
    this.currentTags.splice(id, 1);
    this.currentTags.length !== 0
      ? this.jobService.existingTags.next(this.currentTags)
      : this.jobService.clearedTags.next(true);
    // console.log(this.currentTags);
  }

  clearTags() {
    this.currentTags.length = 0;
    this.jobService.clearedTags.next(true);
    // console.log(this.currentTags);
  }
}
