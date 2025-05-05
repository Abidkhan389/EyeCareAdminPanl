import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MessageTypes } from './constant';

export const showErrorMessage = (message:any, title?:any) => {
    return Swal.fire({
        title: title != null ? title : MessageTypes.error,
        text: message,
        icon: 'error',
    });
}
export const showSuccessMessage = (message:any, title?:any) => {
    return Swal.fire({
        title: title != null ? title : MessageTypes.success,
        text: message,
        icon: 'success',

    });
}
export const showMessage = (message:any, title?:any) => {
    return Swal.fire({
        title: title != null ? title : '',
        text: message,
    });
}
export const showInfoMessage = (message:any, title?:any) => {
    return Swal.fire({
        title: title != null ? title : MessageTypes.info,
        text: message,
        icon: 'info',
    });
}

export const showWarningMessage = (message:any, showCancelButton:any, confirmButtonText:any, cancelButtonText:any, title?:any) => {
    return Swal.fire({
        title: title != null ? title : MessageTypes.warning,
        text: message,
        icon: 'warning',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
    });
}

export const showConfirmationMessage = (confirmMessage?:any, confirmButtonText?:any, title?:any) => {
    return Swal.fire({
        title: confirmMessage != null ? confirmMessage : 'Are you sure you want to delete the record?',
        text: title != null ? 'You will not be able to recover this file!' : title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText != null ? confirmButtonText : 'Delete',
        cancelButtonText: 'No, keep it',
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        allowOutsideClick: false
    });
}

export const showInfoMessageWithConfirmation = (title?:any, html?:any, cancelButton?:any, confirmButtonText?:any) => {
    return Swal.fire({
        title: title != null ? title : '',
        html: html,
        icon: 'info',
        showCancelButton: cancelButton,
        confirmButtonText: confirmButtonText ? confirmButtonText : 'OK',
        allowOutsideClick: false
    });
}

export const showDeletedSuccessfully = (message?:any, title?:any) => {
    return Swal.fire({
        title: title != null ? title : 'Deleted!',
        text: message != null ? message : 'Your record has been deleted.',
        icon: 'success'
    });
}
export const showQustionMessage = (message:any, showCancelButton:any, confirmButtonText:any, cancelButtonText:any, title?:any) => {
    return Swal.fire({
        title: title != null ? title : MessageTypes.question,
        text: message,
        icon: 'question',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
    });
}
export const deletMessage = () => {
    return Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
}