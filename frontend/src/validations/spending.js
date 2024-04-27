import { useVuelidate } from '@vuelidate/core';
import { required, numeric, maxLength, minValue } from '@vuelidate/validators';

export function validateSpending(validateObject) {
    const rules = {
        spending: { required, numeric, maxLength: maxLength(8), minValue: minValue(1) },
        reason: { required },
      };
    const $v = useVuelidate(rules, { spending: validateObject.spending, reason: validateObject.reason });

    return {
        errors: {
            spending: {
                required: $v.value.spending.required.$invalid,
                numeric: $v.value.spending.numeric.$invalid,
                maxLength: $v.value.spending.maxLength.$invalid,
                minValue: $v.value.spending.minValue.$invalid,
            },
            reason: {
                required: $v.value.reason.required.$invalid,
            }
        },
        validate: function() {
            return $v.value.$touch()
        },
        invalid: $v.value.$invalid,
        invalidSpending: $v.value.spending.$invalid,
        invalidReason: $v.value.reason.$invalid,
    }
}