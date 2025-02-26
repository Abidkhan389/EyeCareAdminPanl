import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { StudentDto } from '../../../apiTypes/project';
import { LearningManagementService } from '../../services/learning-management.service';
import { StudentParticipationDto } from '../../../apiTypes/participation';
import { AlertService } from '../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../shared/models/alert';

@Component({
  selector: 'app-participation-form',
  templateUrl: './participation-form.component.html',
  styleUrls: ['./participation-form.component.scss'],
})
export class ParticipationFormComponent implements OnInit {
  dataSource = new MatTableDataSource<StudentDto>([]);
  displayedColumns: string[] = [
    'studentId',
    'studentName',
    'earnedPoints',
    'comments',
  ];
  periods: string[] = [];
  participationForm!: FormGroup;
  isBulkEdit = false;
  subjectId!: number;

  get studentsFormArray(): FormArray {
    return this.participationForm.get('students') as FormArray;
  }

  getStudentFormGroup(index: number): FormGroup {
    return this.studentsFormArray.at(index) as FormGroup;
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private learningMgmtService: LearningManagementService,
    private participationService: LearningManagementService,
    private alertService: AlertService
  ) {
    this.participationForm = this.fb.group({
      period: [null, Validators.required],
      maxScore: [null, [Validators.required, Validators.min(1)]],
      attendancePercentage: [
        100,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      students: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadPeriods();
    this.checkForEditMode();
    this.route.params.subscribe((params) => {
      this.subjectId = +params['subjectId'];
    });

    this.handleGlobalChanges();
  }

  private loadPeriods(): void {
    this.participationService.getParticipationPeriods().subscribe((periods) => {
      this.periods = periods;
    });
  }

  private checkForEditMode(): void {
    const period = this.route.snapshot.paramMap.get('period');
    if (period) {
      this.isBulkEdit = true;
      this.participationForm.patchValue({ period });
      this.loadParticipationData(period);
    } else {
      this.loadClassroomStudents();
    }
  }

  private loadClassroomStudents(): void {
    const classId = this.route.snapshot.paramMap.get('classId');
    if (classId) {
      this.learningMgmtService.getClassroomStudents(+classId).subscribe(
        (response) => {
          if (response.success) {
            this.dataSource.data = response.data;
            this.setupStudentControls();
          }
        },
        (error) => console.error('Error loading students:', error)
      );
    }
  }

  private loadParticipationData(period: string): void {
    this.participationService
      .getParticipationsByPeriod(this.subjectId, period)
      .subscribe(
        (response) => {
          if (response.success) {
            const firstParticipation = response.data[0];
            this.participationForm.patchValue({
              maxScore: firstParticipation.maxScore,
              attendancePercentage: firstParticipation.attendancePercentage,
            });
            this.dataSource.data = response.data.map((p) => p.studentDto);
            this.populateEarnedPoints(response.data);
          }
        },
        (error) => console.error('Error loading participation data:', error)
      );
  }

  private setupStudentControls(): void {
    this.dataSource.data.forEach((student) => {
      this.studentsFormArray.push(
        this.fb.group({
          studentId: [student.studentId, Validators.required],
          earnedPoints: [
            null,
            [
              Validators.required,
              Validators.min(0),
              Validators.max(this.participationForm.get('maxScore')?.value),
            ],
          ],
          comments: [''],
        })
      );
    });
  }

  private populateEarnedPoints(
    participations: StudentParticipationDto[]
  ): void {
    participations.forEach((participation, index) => {
      this.studentsFormArray.at(index).patchValue({
        earnedPoints: participation.earnedPoints,
        comments: participation.comments,
      });
    });
  }

  onPeriodChange(event: any): void {
    this.participationForm.patchValue({ period: event.value });
  }

  onMaxScoreChange(): void {
    const maxScore = this.participationForm.get('maxScore')?.value;
    this.studentsFormArray.controls.forEach((control) => {
      control
        .get('earnedPoints')
        ?.setValidators([
          Validators.required,
          Validators.min(0),
          Validators.max(maxScore),
        ]);
      control.get('earnedPoints')?.updateValueAndValidity();
    });
  }

  handleGlobalChanges(): void {
    this.participationForm
      .get('maxScore')
      ?.valueChanges.subscribe((maxScore) => {
        this.onMaxScoreChange();
      });
  }

  onSubmit(): void {
    if (this.participationForm.valid) {
      const { period, maxScore, attendancePercentage, students } =
        this.participationForm.value;

      students.forEach((student: any) => {
        const participationData = {
          ...student,
          period,
          maxScore,
          attendancePercentage,
          participationPeriod: period,
          subjectId: this.subjectId,
          isActive: true,
        };

        if (this.isBulkEdit) {
          this.participationService
            .updateParticipation(participationData)
            .subscribe(
              () =>
                this.alertService.alert(
                  `Updated participation for student ${student.firstName} ${student.lastName}`,
                  ALERT_TYPE.SUCCESS
                ),
              (error) => console.error('Failed to update participation:', error)
            );
        } else {
          this.participationService
            .addParticipation(participationData)
            .subscribe(
              () =>
                this.alertService.alert(
                  `Added participation for student ${student.firstName} ${student.lastName}`,
                  ALERT_TYPE.SUCCESS
                ),
              (error) => console.error('Failed to add participation:', error)
            );
        }
      });
    } else {
      console.error('Form is invalid', this.participationForm);
    }
  }
}
