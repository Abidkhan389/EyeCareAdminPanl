import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BusRouteService } from '../../Services/bus-route.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bus-route-view',
  templateUrl: './bus-route-view.component.html',
  styleUrl: './bus-route-view.component.scss'
})
export class BusRouteViewComponent {
  studentListForDropDown!: any[];
  employeeListForDropDown!: any[];
  SelectedBusRouteStudent!: MatTableDataSource<any>;
  SelectedBusRouteEmployee!: MatTableDataSource<any>;
  routeData:any;
  vendor!: any | undefined;
  isLoading = true;
  isReadOnly= false;
  constructor( private route: ActivatedRoute,
    private BusRouteService: BusRouteService,
    private router: Router,
    private message: MatSnackBar){
  }
  columnsForSelectedStudents: string[] = [
    'id',
    'studentId',
    'studentName',
  ];
  columnsForSelectedEmployees: string[] = [
    'id',
    'employeeId',
    'employeeName',
  ];
  ngOnInit() {
    
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadRouteDetails(id);      
      } 
    });    
    
  }
 
  // Convert hh:mm:ss format to hh:mm AM/PM for editing
convertToAmPm(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12; // Convert 24-hour to 12-hour format
  return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
}
loadRouteDetails(id: number): void {
    this.BusRouteService.getBusRouteById(id).subscribe({
      next: (BusRouteData) => {
         // Convert TimeSpan to AM/PM format for both departureTime and finishTime
      BusRouteData.data.departureTime = this.convertToAmPm(BusRouteData.data.departureTime);
      BusRouteData.data.finishTime = this.convertToAmPm(BusRouteData.data.finishTime);
      this.routeData= BusRouteData.data;
        this.SelectedBusRouteStudent = new MatTableDataSource(BusRouteData.data.studentids);
        this.SelectedBusRouteEmployee = new MatTableDataSource(BusRouteData.data.employeeIds);
        this.isReadOnly= true;    
        this.isLoading =false  
       },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load Route data.');
      },
    });
  }
  showErrorMessage(failMessage:string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'] // Optional: for custom styling
    });
  }
}
