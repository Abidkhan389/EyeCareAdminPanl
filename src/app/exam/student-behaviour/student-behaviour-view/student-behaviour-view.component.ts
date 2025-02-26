import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentBehaviourService } from '../../services/student-behaviour.service';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-behaviour-view',
  templateUrl: './student-behaviour-view.component.html',
  styleUrl: './student-behaviour-view.component.scss'
})
export class StudentBehaviourViewComponent implements OnInit {
  [x: string]: any;
  studentBehaviourData:any;
  isLoading:boolean=true;
  dynamicHeight: string = 'auto'; // Default to auto height
  reportLength: 5;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);
constructor(private dialogRef: MatDialogRef<StudentBehaviourViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
private studentbehaviourService : StudentBehaviourService,private message: MatSnackBar,private sanitizer: DomSanitizer)
{
  this.dynamicHeight = `${Math.max(300, this.reportLength * 50)}px`; // Ensures a minimum height of 300px
}
ngOnInit(): void {
  if (this.data.studentBehaviourId) {
    this.GetStudentBehaviour()
  }
}
GetStudentBehaviour() {
    this.studentbehaviourService.GetBehaviorForViewByIdAsync(this.data.studentBehaviourId).subscribe({
      next: (response: RepoResponse<any[]>) => {
        if (response.success) {
          this.studentBehaviourData=response.data;
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  extractFileName(attachment: string): string {
    // Split by backslash to get the filename (last part)
    const fileNameWithExtension = attachment.split('\\').pop() || '';

    // Split by dot to remove the extension (get the name before .jpg, .png, etc.)
    const fileName = fileNameWithExtension.split('.')[0];

    return fileName;
}
fist_isImage(fileName: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg','.pdf'];
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
