import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassRoom } from '../../apiTypes/classroom';
import { ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrl: './view-classroom.component.scss',
})
export class ViewClassroomComponent implements OnInit {
  classroom : any;
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id']; // Get ClassRoom ID from the route
      this.loadClassRoomDetails(id);
    });
  }

  loadClassRoomDetails(id: number): void {
    this.classroomService.getClassRoomByIdForView(id).subscribe({
      next: (response) => {
        this.classroom = response.data; // Assign the fetched employee data
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching classroom details:', err);
        this.isLoading = false;
      },
    });
  }
}
