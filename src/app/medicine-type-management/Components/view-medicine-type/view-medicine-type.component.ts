import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicinetypeService } from '../../Services/medicinetype.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-view-medicine-type',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './view-medicine-type.component.html',
  styleUrl: './view-medicine-type.component.scss'
})
export class ViewMedicineTypeComponent {

  loading:boolean= true;
  medicineType:any
  
constructor(
    private route: ActivatedRoute,
    private medicineTypeService:MedicinetypeService,
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Get employee ID from the route
      this.GetMedicineType(id);
    });
  }

  GetMedicineType(id:any) {
     this.loading = true;
     let model = Object.assign({});
     model.id = id;
   
     this.medicineTypeService.getMedicineTypeById(model).pipe(
       finalize(() => {
         this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
       })
     )
     .subscribe(
       (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
         if (result) {
          this.medicineType=result.data;
         }
       },
       (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
         showErrorMessage(ResultMessages.serverError);
       }
     );
   }
}
