import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { StudentParticipationDto } from '../../apiTypes/participation';
import { LearningManagementService } from '../services/learning-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { ALERT_TYPE } from '../../shared/models/alert';
import { AlertService } from '../../shared/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrl: './participation.component.scss',
})
export class ParticipationComponent implements OnInit {
  periods: string[] = [];
  selectedPeriod: string | null = null;
  dataSource = new MatTableDataSource<StudentParticipationDto>([]);
  displayedColumns: string[] = [
    'studentName',
    'earnedPoints',
    'maxScore',
    'participationPeriod',
    'attendancePercentage',
    'comments',
    'actions',
  ];
  classId!: number;
  subjectId!: number;
  editingRow: StudentParticipationDto | null = null; // Track the row being edited
  isLoading = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private participationService: LearningManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.participationService
      .getParticipationPeriods()
      .subscribe((periods: string[]) => {
        this.periods = periods;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      });
    this.route.params.subscribe((params) => {
      this.classId = +params['classId'];
      this.subjectId = +params['subjectId'];
    });
  }

  onGetParticipation(): void {
    if (this.selectedPeriod) {
      this.isLoading = true;
      this.participationService
        .getParticipationsByPeriod(this.subjectId, this.selectedPeriod)
        .subscribe(
          (response: RepoResponse<StudentParticipationDto[]>) => {
            this.dataSource.data = response.data;
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
            console.error('Failed to retrieve participation data:', error);
          }
        );
    }
  }

  createParticipation() {
    this.router.navigate([
      `learning/participation/create/${this.classId}/${this.subjectId}`,
    ]);
  }

  onPeriodChange(event: MatSelectChange): void {
    this.selectedPeriod = event.value;
  }

  // Enable edit mode for a row
  editStudentParticipation(row: StudentParticipationDto): void {
    this.editingRow = { ...row }; // Create a copy of the row to edit
  }

  // Save changes and update the participation
  saveStudentParticipation(row: StudentParticipationDto): void {
    if (this.editingRow) {
      this.participationService.updateParticipation(this.editingRow).subscribe(
        (res) => {
          if (res.success) {
            this.alertService.alert(
              `Participation updated for student ${this.editingRow?.studentDto.firstName} ${this.editingRow?.studentDto.lastName}`,
              ALERT_TYPE.SUCCESS
            );
          } else {
            this.alertService.alert(
              `Participation update failed! if issue persists, please contact admin.`,
              ALERT_TYPE.ERROR
            );
          }
          // Update the dataSource with new values
          Object.assign(row, this.editingRow);
          this.editingRow = null; // Exit edit mode
        },
        (error) => console.error('Failed to update participation:', error)
      );
    }
  }

  // Cancel edit mode
  cancelEdit(): void {
    this.editingRow = null;
  }
}
