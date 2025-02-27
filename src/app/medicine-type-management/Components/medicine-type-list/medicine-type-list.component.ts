import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-medicine-type-list',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './medicine-type-list.component.html',
  styleUrl: './medicine-type-list.component.scss'
})
export class MedicineTypeListComponent {

}
