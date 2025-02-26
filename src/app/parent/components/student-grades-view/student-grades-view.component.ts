import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GradeBookService } from '../../student-dashboard/service/grade-book.service';
interface Grade {
  grade: string;  // Grade letter (e.g., A, B, C, etc.)
  monthName: number;  // Numeric value of the month (1 for January, 2 for February, etc.)
}

interface Subject {
  SubjectName: string;
  grades: Grade[];  // List of grades associated with this subject
}

interface SubjectQuarterWiseViewReport {
  SubjectName: string;
  grades: Grade[];  // List of grades per subject
}
@Component({
  selector: 'app-student-grades-view',
  templateUrl: './student-grades-view.component.html',
  styleUrl: './student-grades-view.component.scss'
})

export class StudentGradesViewComponent implements OnInit {
  studentGradesViewData: any // Your data will populate here
  displayedColumns: string[] = ['subjectName']; // Start with subjectName as default column
  monthColumns: number[] = []; // Array to hold month columns
  dataSource !: MatTableDataSource<any>;
  SubjectQuarterWiseViewReport:any;
  todayDate: Date = new Date(); 
  data:any;
  dynamicHeight: string = 'auto'; // Default to auto height
  rowCount:number=0;
  isLoading:boolean=true;
  constructor(private gradeBookService: GradeBookService) {
   
  }
  ngOnInit(): void {

 // Subscribe to the data from the service
 this.gradeBookService.sharedData$.subscribe((gradeBook) => {
  this.data = gradeBook;
  const reportLength =
  (this.data.subjectQuarterWiseReport?.length || 0) + (this.data.studentGradesData?.length || 0);

// Dynamically set the modal height based on the report length
this.dynamicHeight = `${Math.max(300, reportLength * 50)}px`; // Ensures a minimum height of 300px
// 
this.studentGradesViewData=this.data.studentGradesData;
this.SubjectQuarterWiseViewReport= this.data.subjectQuarterWiseReport;
this.SubjectQuarterWiseViewReport.forEach((x: { subjectName: string }) => {
  if (x.subjectName != "") {
    this.rowCount=this.rowCount+1;
  }
});
console.log(this.rowCount);

//this.dataSource=this.studentGradesViewData.subjectQuarterWiseReport,
this.monthColumns = Array.from({ length: this.data.quarterCount }, (_, index) => index + 1);
this.displayedColumns = ['subjectName', ...this.monthColumns.map(month => `month${month}`)];
this.isLoading=false;
});


  }
 // Helper function to get the grade for a specific month
getGradeForMonth(element: any, column: string): string {
  const month = parseInt(column.replace('month', ''), 10); // Extract the month number (integer)

  // Find the correct subject from SubjectQuarterWiseViewReport that matches the current element
  const subject = this.SubjectQuarterWiseViewReport.find((subj: any) => subj.subjectName === element.subjectName);

  if (subject) {
    // Find the grade for the specific month
    const grade = subject.grades.find((x: { grade: string; monthName: string }) => parseInt(x.monthName, 10) === month);

    if (grade) {
      return grade.grade; // Return the grade for the specific month
    }
  }

  return "-"; // Return 'N/A' if no grade is found for the month
}

  
}
