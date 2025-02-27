import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { WelcomeService } from '../../services/welcom/welcome.service';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MaterialModule,TranslateModule,CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class AppWelcomeComponent {
  constructor() {}
}
