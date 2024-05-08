<template>
  <div class="history">
    <table v-if="props.balances" class="history-table">
      <tr>
        <th>Сумма</th>
        <th>Дата</th>
        <th>{{ action }}</th>
      </tr>
      <tr class="history-data" v-for="balance in props.balances" :key="balance.id">
        <td
          class="balance"
          v-if="
            (balance.id !== currentIndex || !showInput || actionType === 'delete') &&
            (!showSkeleton || balance.id !== currentIndex)
          "
        >
          {{ quantityFormatterRUB(balance.amount) }}
        </td>
        <td
          class="balance"
          v-else-if="
            (balance.id !== currentIndex || !showInput || actionType === 'delete') &&
            (showSkeleton || balance.id === currentIndex)
          "
        >
          <BalanceHistoryItem></BalanceHistoryItem>
        </td>
        <td class="balance" v-else-if="showInput && balance.id === currentIndex && actionType === 'change'">
          <UiInput :invalid="$v.balance.$error" v-model="currentChange" fontSize="16px" textAlign="center"></UiInput>
        </td>

        <td class="data">{{ balance.created_at_formated }}</td>

        <td class="actions" v-if="balance.id !== currentIndex || !showInput">
          <UIButton
            @click="changeVisibility(balance.id, balance.amount, 'Удалить', 'delete')"
            :border="false"
            :buttonType="'default'"
          >
            <template #right-icon>
              <UiIcon icon="delete" />
            </template>
          </UIButton>
          <UIButton
            @click="changeVisibility(balance.id, balance.amount, 'Изменить', 'change')"
            :border="false"
            :buttonType="'default'"
          >
            <template #right-icon>
              <UiIcon icon="change" />
            </template>
          </UIButton>
        </td>

        <td class="actions" v-else-if="showInput && balance.id === currentIndex">
          <UIButton @click="changeVisibility(balance.id)" :border="false" :buttonType="'default'">
            <template #right-icon>
              <UiIcon icon="cancel" />
            </template>
          </UIButton>
          <UIButton
            @click="
              actionType === 'change'
                ? updateBalance(currentChange, balance.id, balance.amount)
                : deleteBalanceFromHistory(balance.id)
            "
            :border="false"
            :buttonType="'default'"
          >
            <template #right-icon>
              <UiIcon icon="submit" />
            </template>
          </UIButton>
        </td>
      </tr>
    </table>
  </div>

  <div class="buttons-contanier">
    <UIButton :buttonType="'cancel'" type="submit" :withoutIcon="true" @click="closeHistory(false)">
      <p>Выйти</p>
    </UIButton>
  </div>
  <TheToaster ref="toaster"></TheToaster>
</template>

<script setup>
import UIButton from '../ui/UiButton.vue';
import UiIcon from '../ui/UIIcon.vue';
import BalanceHistoryItem from '../skeletons/BalanceHistoryItem.vue';
import TheToaster from './TheToaster.vue';
import { putBalance, deleteBalance } from '../../api/balance';
import { quantityFormatterRUB } from '../../utils/quantityFormatters';
import UiInput from '../ui/UiInput.vue';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, maxLength, minValue } from '@vuelidate/validators';

const props = defineProps({
  isModalVisible: {
    type: Boolean,
  },
  balances: {
    type: Array,
  },
});
const emits = defineEmits(['update:isModalVisible', 'updateBalance', 'deleteBalance']);

const closeHistory = (value) => {
  emits('update:isModalVisible', value);
};

//Ссылка на тостер
const toaster = ref(null);

//Удалаяем или изменяем
let actionType = ref('');

//Показать инпут или нет
let showInput = ref(false);

//Индекс элемента на который кликаем чтобы совершить действие
let currentIndex = ref();

//Для текущего нового введенного баланса
let currentChange = ref();

//Для заголовка столбца
let action = ref('Действия');

const changeVisibility = (index, currentBalance, pickedAction, actionTypeParam) => {
  if (currentIndex.value !== index && showInput.value === true) {
    showInput.value = true;
  } else {
    showInput.value = !showInput.value;
    action.value = showInput.value ? pickedAction : 'Действия';
  }

  actionType.value = actionTypeParam;
  currentIndex.value = index;
  currentChange.value = currentBalance;
};

//Показать скелетон или нет
//Так как при обновлении есть маленькая задержка
let showSkeleton = ref(false);

//Валидация
const rules = {
  balance: { required, numeric, maxLength: maxLength(8), minValue: minValue(1) },
};
const $v = useVuelidate(rules, { balance: currentChange });

const updateBalance = async (currentChange, id, oldValue) => {
  if (Number(currentChange) === oldValue) {
    showInput.value = false;
    action.value = 'Действия';
    return;
  } else if ($v.value.$invalid) {
    $v.value.$touch();
    toaster.value.error('Неправильный формат!')
    return;
  }
  showInput.value = false;
  action.value = 'Действия';
  showSkeleton.value = true;

  setTimeout(() => {
    showSkeleton.value = false;
  }, 1000);

  toaster.value.success('Баланс изменен!');
  emits('updateBalance', await putBalance(id, Number(currentChange)));
};


const deleteBalanceFromHistory = async (id) => {
  toaster.value.success('Баланс удален!');
  emits('deleteBalance', await deleteBalance(id));
  action.value = 'Действия';
  actionType.value = '';
  showInput.value = false;
  console.log(id);
};
</script>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
td {
  vertical-align: middle;
  text-align: center;
}

.history {
  overflow-y: auto;
  max-height: 250px;
  width: 100%;
}

.history::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(26, 24, 47, 0.15);
  border-radius: 5px;
}

.history::-webkit-scrollbar-thumb {
  width: 8px;
  background: var(--scroll-bar-color);
  border-radius: 5px;
}

.history-table {
  width: 100%;
}
.buttons-contanier {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.history-data {
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
}

.history-data:last-child {
  margin-bottom: 0px;
}

.balance {
  width: 30%;
}
.date {
  width: 40%;
}

</style>
