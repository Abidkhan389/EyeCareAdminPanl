import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(
  passwordFieldName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent; // Access the parent FormGroup
    if (!formGroup) return null;

    const passwordValue = formGroup.get(passwordFieldName)?.value;
    const confirmPasswordValue = control.value;

    // Check if password matches confirmPassword
    return passwordValue === confirmPasswordValue
      ? null
      : { confirmPasswordMismatch: true };
  };
}
