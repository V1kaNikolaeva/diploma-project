<template>
  <form action="" @click.prevent="handler">
    <UIInput v-model="localBalance.balance" :invalid="$v.balance.$error" :label="labelName" placeholeder="Сумма" />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="
          $v.balance.required.$invalid
            ? 'required'
            : $v.balance.numeric.$invalid
              ? 'numeric'
              : $v.balance.maxLength.$invalid
                ? 'long'
                : $v.balance.minValue.$invalid
                  ? 'zero'
                  : false
        "
        labelName="баланс"
        v-show="$v.balance.$error"
      ></ErrorMessage>
    </UiErrorContanier>
    <div class="buttons-contanier">
      <UIButton :buttonType="'cancel'" type="submit" :withoutIcon="true" @click="replenishBalance(false)">
        <p>Отмена</p>
      </UIButton>
      <UIButton :buttonType="'success'" :withoutIcon="true" @click="replenishBalance(localBalance)">
        <p>Добавить</p>
      </UIButton>
    </div>
  </form>
  <TheToaster ref="toaster"></TheToaster>
</template>

<script setup>
import UIInput from '../ui/UiInput.vue';
import UIButton from '../ui/UiButton.vue';
import TheToaster from '../common/TheToaster.vue';
import ErrorMessage from '../common/ErrorMessage.vue';
import UiErrorContanier from '../ui/UiErrorContanier.vue';
import { balance } from '../../services/projectServices';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, maxLength, minValue } from '@vuelidate/validators';
import { postBalance } from '@/api/balance';

let localBalance = ref(balance());

const props = defineProps({
  isModalVisible: {
    type: Boolean,
  },
  balances: {
    type: Array,
  },
  labelName: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(['update:isModalVisible', 'postBalance']);
const route = useRoute();
const toaster = ref(null);

const rules = {
  balance: { required, numeric, maxLength: maxLength(8), minValue: minValue(1) },
};
const $v = useVuelidate(rules, localBalance);


const replenishBalance = async (value) => {
  if (value === false) {
    return emits('update:isModalVisible', value);
  } else if ($v.value.$invalid) {
    $v.value.$touch();
  } else {
    try {
      const response = await postBalance({ amount: Number(localBalance.value.balance) })
      emits('postBalance', response)
      toaster.value.success('Пополнено!');
    } catch(error) {
      console.log(error)
    }
  }
};
</script>

<style scoped>
.buttons-contanier {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
