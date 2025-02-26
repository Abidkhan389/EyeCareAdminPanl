import { Component, OnInit } from '@angular/core';
import { EmployeePerson } from '../../../apiTypes/employee';
import { ActivatedRoute } from '@angular/router';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.scss'
})
export class EmployeeViewComponent  implements OnInit{
  employee!: EmployeePerson | undefined;
  isLoading = true;
  isreadOnly= false;
  employeeData:any;
  constructor(
    private route: ActivatedRoute,
    private employeeService:EmployeeService ,
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id']; // Get employee ID from the route
      this.loadEmployeeDetails(id);
    });
  }

  loadEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (response) => {
        //this.employee = response.data; // Assign the fetched employee data
        this.employeeData=response.data;
        this.isreadOnly = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employee details:', err);
        this.isLoading = false;
      },
    });
  }

}
