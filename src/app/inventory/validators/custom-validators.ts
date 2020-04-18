import { FormGroup, ValidatorFn } from '@angular/forms';

export function atleastOneIsRequired(validator: ValidatorFn): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } | null => {
        const isValid = group && group.controls && Object.keys(group.controls).some(c => !validator(group.controls[c]));
        return isValid ? null : { atleastOneRequired: { value: 'do not have value for any of controls' } };
    };
}

export function sumShouldNotBeMoreThanPresentQuantity(quantity: number): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } | null => {
        let isValid = true;
        if (group && group.controls) {
            let total = 0;
            Object.keys(group.controls).forEach(c => {
                total += +group.controls[c].value;
            });
            if (total > quantity) {
                isValid = false;
            }
        }
        return isValid ? null : { sumShouldNotBeMoreThanPresentQuantity: { value: 'Entered quantity exceeds present quantity' } };
    };
}
