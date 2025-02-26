import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDeleteResponseType } from '../models/confirmDeleteResponseType';
import { ConfirmDeleteModalComponent } from '../components/confirm-delete-modal/confirm-delete-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  close() {
    this.dialog.closeAll();
  }

  open<T, D = any>(
    component: T,
    data?: D,
    winWidth?: string, // Default width to 50%
    winHeight?: string, // Default height to 50%
    backdropClose?: boolean
  ): MatDialogRef<T> {
    return this.dialog.open(component as any, {
      width: winWidth ?? '90%',
      height: winHeight ?? '95%',
      data, // Passing data to the modal component
      disableClose: backdropClose,
      closeOnNavigation: backdropClose,
    });
  }

  confirmAction(
    message: string | null = null,
    confirmLabel: string | null = null,
    cancelLabel: string | null = null
  ) {
    return this.confirmDelete(
      message ?? 'Are you sure?',
      confirmLabel ?? 'Ok',
      cancelLabel ?? 'Cancel'
    );
  }
  confirmDelete(
    message: string | null = null,
    confirmLabel: string | null = null,
    cancelLabel: string | null = null
  ): Observable<ConfirmDeleteResponseType> {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '400px',
      data: {
        message,
        confirmLabel,
        cancelLabel,
      },
    });

    return dialogRef.afterClosed();
  }
}
