import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmEmailOrPhoneNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    // Email and Phone Number Regular Expressions
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    const isValidPhoneNumber = /^[0-9]{10,15}$/.test(value); // Adjust for your phone number format

    // If neither is valid, return an error
    const isValid = isValidEmail || isValidPhoneNumber;

    return isValid ? null : { emailOrPhoneInvalid: true }; // Error if neither is valid
  };
}
