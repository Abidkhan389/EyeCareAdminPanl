import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-viewpatientcheckup-description',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './viewpatientcheckup-description.component.html',
  styleUrl: './viewpatientcheckup-description.component.scss'
})
export class ViewpatientcheckupDescriptionComponent {

}
