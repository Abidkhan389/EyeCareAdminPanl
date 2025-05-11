import { FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MatchPassword(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
        let passwordInput = group.controls[password],
            passwordConfirmationInput = group.controls[confirmPassword];
        if (passwordInput.value && passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({ notEquivalent: true })
        }
        else {
            return passwordConfirmationInput.setErrors(null);
        }
    }
}



export function compareTime(startTimeCtrl: string, endTimeCtrl: string) {
    return (group: FormGroup) => {
        let startTime = group.controls[startTimeCtrl];
        let endTime = group.controls[endTimeCtrl];
        if (startTime.value && endTime.value) {
            if (startTime.value > endTime.value) {
                return startTime.setErrors({ timeValid: true });
            }
            else {
                return startTime.setErrors(null);
            }
        }
    }
}


export function checkGreaterValues(ctrlOne: string, ctrlTwo: string) {
    return (group: FormGroup) => {
        let ctrlOneControl = group.controls[ctrlOne];
        let ctrlTwoControl = group.controls[ctrlTwo];
        let valueOne = parseFloat(ctrlOneControl.value);
        let valueTwo = parseFloat(ctrlTwoControl.value);
        if (valueOne && valueTwo) {
            if (valueTwo > valueOne) {
                return ctrlTwoControl.setErrors({ compareValue: true });
            }
            else {
                return ctrlTwoControl.setErrors(null);
            }
        }

    }
}

export function NoWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    // Check if the value is a string and if it has whitespace only
    if (control.value && typeof control.value === 'string') {
        const isWhitespace = control.value.trim().length === 0;
        const isEmpty = control.value.length === 0;

        // Return error if only whitespace and not empty
        return isWhitespace && !isEmpty ? { whitespace: true } : null;
    }
    return null; // Return null if value is not a string or is valid
}

export function SelectRequiredValidator(control: FormControl) {
    if (!(control.value) || control.value == 'null') {
        return {
            required: true
        };
    }
    return null;
}

export function atLeastOneItemValidator(control: AbstractControl): ValidationErrors | null {
  const formArray = control as any;
  return formArray && formArray.length > 0 ? null : { required: true };
}





