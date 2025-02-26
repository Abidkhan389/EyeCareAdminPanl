// src/app/shared/confirmation.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor() {}

  confirmDelete(
    message: string = 'Are you sure want to Delete?',
    confirmText: string = 'Yes, Delete!',
    cancelText: string = "No, Don't Delete"
  ) {
    return Swal.fire({
      title: message,
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });
  }
}
