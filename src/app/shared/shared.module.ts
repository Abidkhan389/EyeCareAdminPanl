import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { AddressComponent } from './components/address/address.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../material/material.module';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { AdminOnlyDirective } from './directives/app-admin-only.directive';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
//import { MatTimepickerModule } from 'mat-timepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    LoadingComponent,
    PhoneNumberPipe,
    AddressComponent,
    ConfirmDeleteModalComponent,
    AdminOnlyDirective,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    MatSelectModule,
    NgxMatTimepickerModule,
    MatOptionModule, // For mat-option
    MatButtonModule,
    TablerIconsModule,
    MatStepperModule,
    TranslateModule,
    MatPaginatorModule
  ],
  exports: [
    LoadingComponent,
    PhoneNumberPipe,
    AddressComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    AdminOnlyDirective,
    MatSlideToggleModule,
    FormsModule,
    MatSelectModule,
    NgxMatTimepickerModule,
    MatOptionModule, // For mat-option
    MatButtonModule,
    TablerIconsModule,
    MatStepperModule,
    TranslateModule,
    MatPaginatorModule
  ],
})
export class SharedModule {}
