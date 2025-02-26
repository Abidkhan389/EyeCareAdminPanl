import { Component, OnInit, OnDestroy } from '@angular/core';
import { STudentBehaviourSharedDataService } from '../../student-dashboard/service/student-behaviour-shared-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-behavior',
  templateUrl: './student-behavior.component.html',
  styleUrls: ['./student-behavior.component.scss'], // Corrected `styleUrls`
})
export class StudentBehaviorComponent implements OnInit, OnDestroy {
  studentBehaviourData: any;
  private destroy$: Subject<void> = new Subject<void>(); // Moved `destroy$` inside the class
  isLoading:boolean=true;
  isShow:boolean=true;
  constructor(private sTudentBehaviourSharedDataService: STudentBehaviourSharedDataService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Subscribe to the data from the service
    this.sTudentBehaviourSharedDataService.sharedData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if(response != null)
        {
          this.studentBehaviourData = response;
          this.isShow=false;
        }
        this.isLoading=false;
      });
  }

  ngOnDestroy(): void {
    // Cleanup: Prevent memory leaks by completing the subject
    this.destroy$.next();
    this.destroy$.complete();
  }
  extractFileName(attachment: string): string {
    // Split by backslash to get the filename (last part)
    const fileNameWithExtension = attachment.split('\\').pop() || '';

    // Split by dot to remove the extension (get the name before .jpg, .png, etc.)
    const fileName = fileNameWithExtension.split('.')[0];

    return fileName;
}
firstone_isImage(fileName: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
  const extension = fileName.split('.').pop()?.toLowerCase();
  return imageExtensions.includes(extension || '');
}

isImage(attachment: string): boolean {
  return /\.(jpg|jpeg|png|gif)$/i.test(attachment);
}

getSafeUrl(attachment: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl('/UploadedFiles/' + attachment);
}

}
