import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDeleteResponseType } from '../../models/confirmDeleteResponseType';

@Component({
  selector: 'app-confirm-delete-modal',
  template: `
    <h2 mat-dialog-title>{{ 'Confirm Action' | translate }}</h2>
    <mat-dialog-content>
      <p>
        {{
          data.message ?? 'You are about to delete this item. Are you sure?'
            | translate
        }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button
        mat-flat-button
        color="primary"
        class="button-search"
        (click)="onCancel()"
      >
        {{ data.cancelLabel ?? 'Cancel' | translate }}
      </button>
      <button
        mat-raised-button
        color="warn"
        class="btn btn-danger btn-small"
        (click)="onConfirm()"
      >
        {{ data.confirmLabel ?? 'Yes Delete Item' | translate }}
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string | null;
      confirmLabel: string | null;
      cancelLabel: string | null;
    }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(ConfirmDeleteResponseType.CONFIRMED);
  }

  onCancel(): void {
    this.dialogRef.close(ConfirmDeleteResponseType.CANCELED);
  }
}
