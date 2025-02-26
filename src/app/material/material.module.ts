import { NgModule } from '@angular/core';

// Angular CDK **************************

import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

// Angular Material **************************

import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatNativeDateModule } from '@angular/material/core';
import { LayoutModule } from '@angular/cdk/layout';

/**
 * MaterialModule is a module that groups Angular CDK and Angular Material components.
 *
 * @description
 * This module imports and exports various Angular Material and Angular CDK modules.
 * It facilitates the usage of Angular Material components throughout the application.
 *
 * Included components are related to accessibility (a11y), clipboard, drag-drop, portal,
 * scrolling, tables, trees, and various UI elements provided by Angular Material such as
 * dividers, sidenav, cards, tables, tabs, badges, form fields, dialogs, icons, and more.
 */
@NgModule({
  declarations: [],
  imports: [
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatTreeModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    MatStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatBottomSheetModule,
    LayoutModule,
  ],
  exports: [
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatTreeModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    MatStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatBottomSheetModule,
    LayoutModule,
  ],
  providers: [],
})
export class MaterialModule {}
