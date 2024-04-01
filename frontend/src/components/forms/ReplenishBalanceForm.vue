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
        :messageType="$v.balance.required.$invalid ? 'required' : $v.balance.numeric.$invalid ? 'numeric' : false"
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
import axios from 'axios';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';

let localBalance = ref(balance());

const props = defineProps({
  isModalVisible: {
    type: Boolean,
  },
  balances: {
    type: Array,
  },
});
const emits = defineEmits(['update:isModalVisible', 'update:balances']);
const route = useRoute();
const toaster = ref(null);

const rules = {
  balance: { required, numeric },
};
const $v = useVuelidate(rules, localBalance);

const replenishBalance = async (value) => {
  if (value === false) {
    return emits('update:isModalVisible', value);
  } else if ($v.value.$invalid) {
    $v.value.$touch();
  } else {

    await axios
      .post('/api/balance/create/', { amount: Number(localBalance.value.balance) })
      .then((response) => {
        toaster.value.success('Пополнено!')
        console.log(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      });

    await axios
      .get(`/api/balance/${route.params.id}`)
      .then((response) => {
        emits('update:balances', Object.values(response.data).flat());
        console.log(props.balances);
      })
      .catch((error) => {
        console.log('error', error);
      });
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
