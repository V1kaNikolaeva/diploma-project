<template>
  <form action="" @click.prevent="handler">
    <UIInput v-model="localBalance.balance" :invalid="validation.invalid" :label="labelName" placeholeder="Сумма" />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="
          validation.errors.required
            ? 'required'
            : validation.errors.numeric
              ? 'numeric'
              : validation.errors.maxLength
                ? 'long'
                : validation.errors.minValue
                  ? 'zero'
                  : false
        "
        labelName="баланс"
        v-show="validation.invalid"
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
import { onMounted, ref, watch } from 'vue';
import { validateBalance } from '../../validations/balance'


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
const emits = defineEmits(['update:isModalVisible', 'update:balances']);
const route = useRoute();
const toaster = ref(null);

let validation = ref();
validation.value = validateBalance(localBalance.value.balance)

watch( 
  () => localBalance.value.balance,
  (balance) => {
  validation.value = validateBalance(balance)
  if (validation.value.invalid) {
    validation.value.validate()
  }
})

const replenishBalance = async (value) => {
  if (value === false) {
    return emits('update:isModalVisible', value);
  } else if (validation.value.invalid) {
    validation.value.validate();
  } else {
    await axios
      .post('/api/balance/create/', { amount: Number(localBalance.value.balance) })
      .then((response) => {
        toaster.value.success('Пополнено!');
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      });

    await axios
      .get(`/api/balance/${route.params.id}`)
      .then((response) => {
        emits('update:balances', Object.values(response.data).flat());
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
