import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';
import { MedicinesService } from '../../Services/medicines.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-view-medicine',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './view-medicine.component.html',
  styleUrl: './view-medicine.component.scss'
})
export class ViewMedicineComponent {
  loading:boolean= true;
  medicineDetail:any
  
constructor(
    private route: ActivatedRoute,
    private medicineService:MedicinesService,
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Get employee ID from the route
      this.GetMedicine(id);
    });
  }

  GetMedicine(id:any) {
     this.loading = true;
     let model = Object.assign({});
     model.id = id;
   
     this.medicineService.getMedicineById(model).pipe(
       finalize(() => {
         this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
       })
     )
     .subscribe(
       (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
         if (result) {
          debugger;
          this.medicineDetail=result.data;
         }
       },
       (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
         showErrorMessage(ResultMessages.serverError);
       }
     );
   }
}
