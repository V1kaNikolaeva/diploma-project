import { useVuelidate } from '@vuelidate/core';
import { required, numeric, maxLength, minValue } from '@vuelidate/validators';

export function validateBalance(validateField) {
    console.log(validateField)
    const rules = {
        balance: { required, numeric, maxLength: maxLength(8), minValue: minValue(1) },
      };
    const $v = useVuelidate(rules, { balance: validateField });

    return {
        errors: {
            required: validateField !== null ? $v.value.balance.required.$invalid : false,
            numeric: validateField !== null ? $v.value.balance.numeric.$invalid : false,
            maxLength: validateField !== null ? $v.value.balance.maxLength.$invalid : false,
            minValue: validateField !== null ? $v.value.balance.minValue.$invalid : false,
        },
        validate: function() {
            return $v.value.balance.$touch() 
        },
        invalid: validateField !== null ? $v.value.balance.$invalid : false,
    }
}