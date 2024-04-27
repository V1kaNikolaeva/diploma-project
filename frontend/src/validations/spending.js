import { useVuelidate } from '@vuelidate/core';
import { required, numeric, maxLength, minValue } from '@vuelidate/validators';

export function validateSpending(validateObject) {
    console.log(validateObject)
    const rules = {
        spending: { required, numeric, maxLength: maxLength(8), minValue: minValue(1) },
        reason: { required },
      };
    const $v = useVuelidate(rules, { spending: validateObject.spending, reason: validateObject.reason });

    return {
        errors: {
            spending: {
                required: validateObject.spending !== null ? $v.value.spending.required.$invalid : false,
                numeric: validateObject.spending !== null ? $v.value.spending.numeric.$invalid : false,
                maxLength: validateObject.spending !== null ? $v.value.spending.maxLength.$invalid : false,
                minValue: validateObject.spending !== null ? $v.value.spending.minValue.$invalid : false,
            },
            reason: {
                required: validateObject.reason !== null ? $v.value.reason.required.$invalid : false,
            }
        },
        validate: function() {
            return $v.value.$touch()
        },
        invalid: validateObject.spending !== null && validateObject.reason !== null ? $v.value.$invalid : false,
        invalidSpending: validateObject.spending !== null ? $v.value.spending.$invalid : false,
        invalidReason: validateObject.reason !== null ? $v.value.reason.$invalid : false,
    }
}