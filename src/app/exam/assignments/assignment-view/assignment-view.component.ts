import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assignment } from '../../../apiTypes/assignment';

@Component({
  selector: 'app-assignment-view',
  templateUrl: './assignment-view.component.html',
  styleUrl: './assignment-view.component.scss',
})
export class AssignmentViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment,
    private dialogRef: MatDialogRef<AssignmentViewComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Determine the assignment's due status based on the current date
  get dueStatus(): 'active' | 'dueSoon' | 'pastDue' {
    const today = new Date();
    const dueDate = new Date(this.assignment.dueDate);

    // Past due if due date is before today
    if (dueDate < today) {
      return 'pastDue';
    }

    // Due soon if due date is tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (
      dueDate.getFullYear() === tomorrow.getFullYear() &&
      dueDate.getMonth() === tomorrow.getMonth() &&
      dueDate.getDate() === tomorrow.getDate()
    ) {
      return 'dueSoon';
    }

    // Active if not past due and not due tomorrow
    return 'active';
  }
}
