<template>
  <div class="history">
    <table v-if="props.balances" class="history-table">
      <tr>
        <th>Сумма</th>
        <th>Дата</th>
        <th>{{ action }}</th>
      </tr>
      <tr class="history-data" v-for="(balance, index) in props.balances" :key="balance.id">
        <td class="balance" v-if="props.balances[index].id !== currentIndex || !showInput">
          {{ quantityFormatterRUB(balance.amount) }}
        </td>
        <td class="balance" v-else-if="showInput && props.balances[index].id === currentIndex">
          <UiInput v-model="currentChange" fontSize="16px" textAlign="center"></UiInput>
        </td>
        <td class="data">{{ balance.created_at_formated }}</td>

        <td class="actions" v-if="props.balances[index].id !== currentIndex || !showInput">
          <UIButton :border="false" :buttonType="'default'">
            <template #right-icon>
              <UiIcon icon="delete" />
            </template>
          </UIButton>
          <UIButton
            @click="changeVisibility(balance.id, balance.amount, 'Изменить')"
            :border="false"
            :buttonType="'default'"
          >
            <template #right-icon>
              <UiIcon icon="change" />
            </template>
          </UIButton>
        </td>

        <td class="actions" v-else-if="showInput && props.balances[index].id === currentIndex">
          <UIButton
            @click="changeVisibility(balance.id)"
            :border="false"
            :buttonType="'default'"
          >
            <template #right-icon>
              <UiIcon icon="cancel" />
            </template>
          </UIButton>
          <UIButton
            @click="updateBalance(currentChange)"
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
</template>

<script setup>
import UIButton from '../ui/UiButton.vue';
import UiIcon from '../ui/UIIcon.vue';
import { quantityFormatterRUB } from '../../utils/quantityFormatters';
import UiInput from '../ui/UiInput.vue';
import { ref } from 'vue';
const props = defineProps({
  isModalVisible: {
    type: Boolean,
  },
  balances: {
    type: Array,
  },
});
const emits = defineEmits(['update:isModalVisible']);

const closeHistory = (value) => {
  emits('update:isModalVisible', value);
};

let showInput = ref(false);
let currentIndex = ref();
let currentChange = ref();
let action = ref('Действия');
const changeVisibility = (index, currentBalance, pickedAction) => {
  if (currentIndex.value !== index && showInput.value === true) {
    showInput.value = true;
  } else {
    showInput.value = !showInput.value;
    action.value = showInput.value ? pickedAction : 'Действия';
  }

  currentIndex.value = index;
  currentChange.value = currentBalance;
};


const updateBalance = (currentChange) => {
  console.log(currentChange);
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
