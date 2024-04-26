<template>
  <form action="" @click.prevent="handler">
    <UIInput label="Введите сумму траты" :invalid="validation.invalidSpending" v-model="localSpending.spending" placeholder="Трата" />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="
          validation.errors.spending.required ? 'required' : 
          validation.errors.spending.numeric ? 'numeric' :
          validation.errors.spending.maxLength ? 'long' :
          validation.errors.spending.minValue ? 'zero' 
          : false"
        labelName="трата"
        v-show="validation.invalidSpending"
      ></ErrorMessage>
    </UiErrorContanier>
    <UIInput label="Опишите причину траты" :invalid="validation.invalidReason" multiline v-model="localSpending.reason" placeholder="Причина" />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="validation.errors.reason.required ? 'required' : false"
        labelName="причина"
        v-show="validation.invalidReason"
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
import { validateSpending } from '../../validations/spending'
import { ref, watch } from 'vue';
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

let validation = ref(validateSpending(localSpending.value))
watch( localSpending.value, 
  (newValue, oldValue) => {
  validation.value = validateSpending(newValue)
  if (validation.value.invalid) {
    validation.value.validate()
  }
})

const createSpending = (data, choose) => {
  validation.value = validateSpending(localSpending.value)
  if (data === false) {
    return emits('update:isModalVisible', data);
  } else if (validation.value.invalid) {
    validation.value.validate();
  } else {
    localSpending.value.spendingType = choose;
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