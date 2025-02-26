import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../../apiTypes/project';
import { LearningManagementService } from '../../services/learning-management.service';

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss'],
})
export class ProjectViewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProjectViewComponent>,
    @Inject(MAT_DIALOG_DATA) public project: Project,
    private learningmgmtService: LearningManagementService
  ) {}

  _project!: Project;
  ngOnInit(): void {
    this.learningmgmtService
      .getProjectDetails(this.project.projectId)
      .subscribe((x) => {
        if (x.success) {
          this._project = x.data;
        }
      });
  }

  // Function to format the due date to a readable string
  get formattedDueDate(): string {
    return new Date(this.project.dueDate).toLocaleDateString();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
