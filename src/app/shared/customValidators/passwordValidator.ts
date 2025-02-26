import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    // Regular expressions for validation
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasCapitalLetter && hasSpecialCharacter;

    return valid
      ? null
      : {
          passwordStrength: {
            hasCapitalLetter,
            hasSpecialCharacter,
          },
        };
  };
}
