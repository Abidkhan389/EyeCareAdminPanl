import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrl: './attendance-calendar.component.scss',
})
export class AttendanceCalendarComponent {
  @Input() students: any[] = []; // Define `students` as an input property to receive data from the parent
  @Output() attendanceUpdated = new EventEmitter<any>(); // Define an output property to emit updates

  // Function to handle attendance updates
  updateAttendance(student: any, status: boolean) {
    // Emit an event when attendance is updated with the relevant data
    this.attendanceUpdated.emit({ student, status });
  }
}
