import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-day-name-popup',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './day-name-popup.component.html',
  styleUrl: './day-name-popup.component.scss'
})
export class DayNamePopupComponent  implements OnInit{
  fullWeeks: number = 0;
  remainingDays: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<DayNamePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { days: string[] }
  ) {}
  ngOnInit(): void {
    if (this.data.days.length >= 7) {
      this.fullWeeks = Math.floor(this.data.days.length / 7); // Calculate full weeks
      this.remainingDays = this.data.days.slice(this.fullWeeks * 7); // Remaining days
    } else {
      this.remainingDays = this.data.days;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
