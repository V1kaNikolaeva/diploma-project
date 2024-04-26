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
            required: $v.value.balance.required.$invalid,
            numeric: $v.value.balance.numeric.$invalid,
            maxLength: $v.value.balance.maxLength.$invalid,
            minValue: $v.value.balance.minValue.$invalid,
        },
        validate: function() {
            return $v.value.balance.$touch() 
        },
        invalid: $v.value.balance.$invalid,
    }
}