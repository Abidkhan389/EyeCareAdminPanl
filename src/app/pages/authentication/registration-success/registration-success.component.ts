import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-registration-success',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './registration-success.component.html',
  styleUrl: './registration-success.component.scss',
})
export class RegistrationSuccessComponent {}
