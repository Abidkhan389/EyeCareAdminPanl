import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Exam } from '../../../apiTypes/exam';
import { AlertService } from '../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../shared/models/alert';
import { LearningManagementService } from '../../services/learning-management.service';
import { ExamQuestion } from '../../../apiTypes/examQuestion';
import { Messages } from '../../../shared/Validators/validation-messages';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
})
export class ExamFormComponent implements OnInit {
  examForm!: FormGroup;
  isEditMode: boolean;
  classId: number;
  subjectId: number;
  examId?: number;
  validationMessages = Messages.validation_messages;
  maxScore:any;
  questionTotalScore:any;
  totalPointsGreateThanMaxScore:boolean=false;
  constructor(
    private fb: FormBuilder,
    private examService: LearningManagementService,
    private dialogRef: MatDialogRef<ExamFormComponent>,
    private alertService: AlertService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      classId: number;
      subjectId: number;
      isEdit: boolean;
      examId?: number;
      refreshMethod: any;
    }
  ) {
    this.isEditMode = data.isEdit;
    this.classId = data.classId;
    this.subjectId = data.subjectId;
    if (data.examId) this.examId = data.examId;
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.isEditMode && this.examId) {
      this.loadExamDetails();
    }
    this.examForm.get('maxScore')?.valueChanges.subscribe((value) => {
      this.maxScore= value;
    });
    this.examForm.get('questions')?.valueChanges.subscribe(() => {
      this.calculateTotalPoints();
    });
  }

  initializeForm(): void {
    this.examForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, Validators.required],
      maxScore: [null, [Validators.required, Validators.min(0)]],
      isPaperExam: [false],
      questions: this.fb.array([]),
    });

    // Automatically enable/disable questions section based on `isPaperExam`
    this.examForm.get('isPaperExam')?.valueChanges.subscribe((isPaper) => {
      if (isPaper) {
        this.clearQuestions();
      } else if(!this.isEditMode && this.questions.length==0) {
        this.addQuestion(); // Add at least one question
      }
    });
  }

  loadExamDetails(): void {
    this.examService.getExamDetails(this.examId!).subscribe(
      (exam) => {
        this.examForm.patchValue({
          title: exam.data.title,
          description: exam.data.description,
          dueDate: exam.data.dueDate,
          maxScore: exam.data.maxScore,
          isPaperExam: exam.data.isInPerson,
        });
        if (!exam.data.isInPerson) {
          exam?.data?.questions?.forEach((question) =>
            this.addQuestion(question)
          );
        }
      },
      (error) => {
        console.error('Error loading exam details:', error);
      }
    );
  }

  // Accessor for the questions FormArray
  get questions(): FormArray {
    return this.examForm.get('questions') as FormArray;
  }

  // Method to add a question FormGroup
  addQuestion(questionData?: ExamQuestion): void {
    const question = this.fb.group({
      questionText: [questionData?.questionText || '', Validators.required],
      questionType: [
        questionData?.questionType || 'short-answer',
        Validators.required,
      ],
      choices: [questionData?.choices || ''], // JSON string if applicable
      answer: [questionData?.answer || '', Validators.required],
      points: [
        questionData?.points || 0,
        [Validators.required, Validators.min(0)],
      ],
      hint: [questionData?.hint || ''],
      examId: this.isEditMode ? this.data.examId : 0,
    });
    this.questions.push(question);
  }
  // Calculate the total points from the FormArray
  calculateTotalPoints(): void {
    this.questionTotalScore = this.questions.controls.reduce((sum, question) => {
      const points = question.get('points')?.value || 0; // Default to 0 if undefined
      return sum + points;
    }, 0);
    if(this.questionTotalScore > this.maxScore)
    {
      this.totalPointsGreateThanMaxScore=true;
      this.pointsCanNotGreaterThanMaxScore();
    }else{
      this.totalPointsGreateThanMaxScore=false;
    }
    console.log('Total Points:', this.questionTotalScore);
  }

  // Method to remove a question FormGroup
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }
  pointsCanNotGreaterThanMaxScore(){
    Swal.fire("Points Total Value Should be less than Max Score.");
  }

  // Clear questions if isPaperExam is selected
  clearQuestions(): void {
    while (this.questions.length !== 0) {
      this.questions.removeAt(0);
    }
  }

  onSubmit(): void {
    if (this.examForm.invalid) 
      {
        const invalidFields = this.getInvalidFields(this.examForm);
        console.log('Invalid Fields:', invalidFields);  
        return;
      }

    const examData: Exam = {
      ...this.examForm.value,
      classId: this.classId,
      subjectId: this.subjectId,
      examId: this.examId,
      questions: this.examForm.value.isPaperExam
        ? []
        : this.examForm.value.questions,
    };

    if (this.isEditMode) {
      this.examService.updateExam(examData).subscribe((res) => {
        if (res.success) {
          this.alertService.alert(
            'Exam updated successfully!',
            ALERT_TYPE.SUCCESS
          );
          this.data.refreshMethod();
          this.dialogRef.close(true);

        } else {
          this.alertService.alert(
            'Error updating exam: ' + res.errors[0],
            ALERT_TYPE.ERROR
          );
        }
      });
    } else {
      this.examService.createExam(examData).subscribe((res) => {
        if (res.success) {
          this.alertService.alert(
            'Exam created successfully!',
            ALERT_TYPE.SUCCESS
          );
          this.dialogRef.close(true);
        } else {
          this.alertService.alert(
            'Error creating exam: ' + res.errors[0],
            ALERT_TYPE.ERROR
          );
        }
      });
    }
  }
   //Its Close The DialogRef Modal
   closeClick() {
    this.dialogRef.close();
  }
  getInvalidFields(form: FormGroup | FormArray): { field: string; error: any }[] {
    const invalidFields: { field: string; error: any }[] = [];
  
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
  
      if (control instanceof FormGroup || control instanceof FormArray) {
        // Recursive call for nested FormGroup or FormArray
        invalidFields.push(...this.getInvalidFields(control));
      } else if (control && control.invalid) {
        invalidFields.push({ field: key, error: control.errors });
      }
    });
  
    return invalidFields;
  }
}
