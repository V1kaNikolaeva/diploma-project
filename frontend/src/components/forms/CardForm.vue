<template>
  <form action="" @click.prevent="handler">
    <UIInput
      :invalid="$v.spending.$error"
      label="Введите сумму траты"
      v-model="localSpending.spending"
      placeholder="Трата"
    />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="
          $v.spending.required.$invalid
            ? 'required'
            : $v.spending.numeric.$invalid
              ? 'numeric'
              : $v.spending.maxLength.$invalid
                ? 'long'
                : $v.spending.minValue.$invalid
                  ? 'zero'
                  : $v.spending.isZeroFirst.$invalid
                    ? 'zeroFirst'
                    : false
        "
        labelName="трата"
        v-show="$v.spending.$error"
      ></ErrorMessage>
    </UiErrorContanier>
    <UIInput
      :invalid="$v.reason.$error"
      label="Опишите причину траты"
      multiline
      v-model="localSpending.reason"
      placeholder="Причина"
    />
    <UiErrorContanier>
      <ErrorMessage
        :messageType="$v.reason.required.$invalid ? 'required' : false"
        labelName="причина"
        v-show="$v.reason.$error"
      ></ErrorMessage>
    </UiErrorContanier>
    <UiSelect
      labelText="Выберите тип"
      :items="selectItems"
      :showItemFirst="showItemFirst"
      v-model:modelValue="currentItem"
    ></UiSelect>

    <div class="buttons-contanier">
      <UIButton :buttonType="'cancel'" type="submit" :withoutIcon="true" @click="createSpending(false)">
        <p>Отмена</p>
      </UIButton>
      <UIButton
        :buttonType="'success'"
        :withoutIcon="true"
        @click="
          props.updatedData === null
            ? createSpending(localSpending, currentItem)
            : updateSpending(localSpending, currentItem)
        "
      >
        <p v-if="props.updatedData">Изменить</p>
        <p v-else-if="!props.updatedData">Добавить</p>
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
import { required, numeric, maxLength, minValue } from '@vuelidate/validators';
import { isZeroFirst } from '../../validators/isZeroFirst';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { postSpending, putSpending } from '@/api/spending';

const props = defineProps({
  isModalVisible: {
    type: Boolean,
  },
  updatedData: {
    type: Object,
    default: null,
  },
  balanceAmount: {
    type: Number,
  },
});
const emits = defineEmits(['update:isModalVisible', 'update:updatedData', 'postSpending', 'updateSpending']);

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
let currentItem = props.updatedData === null ? ref('other') : ref(props.updatedData.spendingType);

const showItemFirst = computed(() => {
  for (let i = 0; i < selectItems.length; i++) {
    if (currentItem.value === selectItems[i].value) {
      return selectItems[i].name;
    }
  }
});

let localSpending =
  props.updatedData === null
    ? ref(spending())
    : ref(spending(props.updatedData.spending, props.updatedData.reason, props.updatedData.spendingType));

const route = useRoute();
const toaster = ref(null);

const rules = {
  spending: { required, numeric, maxLength: maxLength(8), minValue: minValue(1), isZeroFirst },
  reason: { required },
};
const $v = useVuelidate(rules, localSpending);

const createSpending = async (data, choose) => {
  if (data === false) {
    //Закрытие модального окна
    return emits('update:isModalVisible', data);
  } else if ($v.value.$invalid) {
    //Ошибки валидации
    return $v.value.$touch();
  } else if (props.balanceAmount < Number(localSpending.value.spending)) {
    //Баланса меньше чем трата
    toaster.value.error('Недостаточно средств!');
    return;
  } else {
    //Создание
    localSpending.value.spendingType = choose;
    emits(
      'postSpending',
      await postSpending({
        one_spending: localSpending.value.spending,
        reason: localSpending.value.reason,
        spending_type: localSpending.value.spendingType,
      }),
    );

    toaster.value.success('Трата создана!');
  }
};

const updateSpending = async (data, choose) => {
  if (data === false) {
    //Закрытие модального окна
    return emits('update:isModalVisible', data);
  } else if ($v.value.$invalid) {
    //Ошибки валидации
    return $v.value.$touch();
  } else if (props.balanceAmount < Number(localSpending.value.spending) - Number(props.updatedData.spending)) {
    //Баланса меньше чем измененая трата
    toaster.value.error('Недостаточно средств!');
    return;
  } else {
    localSpending.value.spendingType = choose;
    //Отмена PUT запроса при отсутствии изменений
    if (
      Number(localSpending.value.spending) === Number(props.updatedData.spending) &&
      localSpending.value.reason === props.updatedData.reason &&
      localSpending.value.spendingType === props.updatedData.spendingType
    ) {
      toaster.value.error('Вы ничего не изменили!');
      return;
    }

    //Изменение
    emits(
      'updateSpending',
      await putSpending(props.updatedData.id, {
        one_spending: localSpending.value.spending,
        reason: localSpending.value.reason,
        spending_type: localSpending.value.spendingType,
      }),
    );
    emits('update:updatedData', {
      id: props.updatedData.id,
      spending: Number(localSpending.value.spending),
      reason: localSpending.value.reason,
      spendingType: localSpending.value.spendingType,
    });
    toaster.value.success('Трата изменена!');
    return;
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
