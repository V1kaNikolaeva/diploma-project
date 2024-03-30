<template>
  <div class="history">
    <table v-if="props.balances" class="history-table">
      <tr>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Действия</th>
      </tr>
      <tr class="history-data" v-for="balance in props.balances">
        <td>{{ balance.amount }}</td>
        <td>{{ balance.created_at_formated }}</td>
        <td class="actions">
          <UIButton :border="false" :buttonType="'default'">
            <template #right-icon>
              <UiIcon icon="delete" />
            </template>
          </UIButton>
          <UIButton :border="false" :buttonType="'default'">
            <template #right-icon>
              <UiIcon icon="change" />
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
import UIButton from './UIButton.vue';
import UiIcon from './UiIcon.vue';

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
</style>
