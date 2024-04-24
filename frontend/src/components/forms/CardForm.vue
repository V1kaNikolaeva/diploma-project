<template>
  <form action="" @click.prevent="handler">
    <UIInput label="Введите сумму траты" v-model="localSpending.spending" placeholder="Трата" />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="$v.spending.required.$invalid ? 'required' : $v.spending.numeric.$invalid ? 'numeric' : false"
        labelName="трата"
        v-show="$v.spending.$error"
      ></ErrorMessage>
    </UiErrorContanier>
    <UIInput label="Опишите причину траты" multiline v-model="localSpending.reason" placeholder="Причина" />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="$v.reason.required.$invalid ? 'required' : false"
        labelName="причина"
        v-show="$v.reason.$error"
      ></ErrorMessage>
    </UiErrorContanier>
    <UiSelect labelText="Выберите тип" :items="selectItems" :showItemFirst="showItemFirst" v-model:modelValue="currentItem"></UiSelect>

    <div class="buttons-contanier">
      <UIButton :buttonType="'cancel'" type="submit" :withoutIcon="true" @click="createSpending(false)">
        <p>Отмена</p>
      </UIButton>
      <UIButton :buttonType="'success'" :withoutIcon="true" @click="createSpending(localSpending, currentItem)">
        <p>Добавить</p>
      </UIButton>
    </div>
  </form>
  <TheToaster ref="toaster"></TheToaster>
</template>

<script setup>
import UIInput from '../ui/UiInput.vue';
import UIButton from '../ui/UiButton.vue';
import UiSelect from '../ui/UiSelect.vue';
import TheToaster from '../common/TheToaster.vue';
import ErrorMessage from '../common/ErrorMessage.vue';
import UiErrorContanier from '../ui/UiErrorContanier.vue';
import { spending } from '../../services/spendingService';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const selectItems = [
  { name: 'Здоровье', value: 'medications' },
  { name: 'Продукты', value: 'products' },
  { name: 'Развлечения', value: 'entertainment' },
  { name: 'Электроника', value: 'electronics' },
  { name: 'Поездки', value: 'trips' },
  { name: 'Одежда', value: 'cloth' },
  { name: 'Подарки', value: 'present' },
  { name: 'Другое', value: 'other' },
];
let currentItem = ref('other')
const showItemFirst = ref('Другое')
let localSpending = ref(spending());
const route = useRoute();
const toaster = ref(null);

const props = defineProps({
  isModalVisible: {
    type: Boolean,
  },
});
const emits = defineEmits(['update:isModalVisible']);

const rules = {
  spending: { required, numeric },
  reason: { required },
};
const $v = useVuelidate(rules, localSpending);


const createSpending = (data, choose) => {
  if (data === false) {
    return emits('update:isModalVisible', data);
  } else if ($v.value.$invalid) {
    $v.value.$touch();
  } else {
    localSpending.value.spendingType = choose;
    console.log(localSpending.value)
    toaster.value.success('Трата создана!')
  }
};
</script>

<style scoped>
.buttons-contanier {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>