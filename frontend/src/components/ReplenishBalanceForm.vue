<template>
  <form action="" @click.prevent="handler">
    <UIInput
      v-model="localBalance.balance"
      :invalid="$v.balance.$error"
      label="Ведите сумму, которую хотите положить"
      placeholeder="Сумма"
    />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="!$v.balance.required ? 'required' : !$v.balance.numeric ? 'numeric' : false"
        labelName="баланс"
        v-show="$v.balance.$error"
      ></ErrorMessage>
    </UiErrorContanier>
    <div class="buttons-contanier">
      <UIButton :buttonType="'cancel'" type="" :withoutIcon="true" @click="replenishBalance(false)">
        <p>Отмена</p>
      </UIButton>
      <UIButton :buttonType="'success'" :withoutIcon="true" @click="replenishBalance(true)">
        <p>Добавить</p>
      </UIButton>
    </div>
  </form>
</template>

<script setup>
import UIInput from './UIInput.vue';
import UIButton from './UIButton.vue';
import ErrorMessage from './ErrorMessage.vue';
import UiErrorContanier from './UiErrorContanier.vue';
import { balance } from '../../services/projectServices';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';

let localBalance = ref(balance());

const props = defineProps({
  isModalVisible: {
    type: Boolean,
  },
});
const emits = defineEmits(['update:isModalVisible']);

const rules = {
  balance: { required, numeric },
};
const $v = useVuelidate(rules, localBalance);
const replenishBalance = (value) => {
  if (value === false) {
    return emits('update:isModalVisible', value);
  }
  if ($v.value.$invalid) {
    $v.value.$touch();
    console.log('mda');
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
