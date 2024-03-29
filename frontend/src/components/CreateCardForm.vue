<template>
  <form action="" @click.prevent="handler">
    <UIInput v-model="localBalance.balance" label="Создание траты" placeholeder="трата" />
    <div class="buttons-contanier">
      <UIButton :withoutIcon="true" @click="replenishBalance(false)">
        <p>Отмена</p>
      </UIButton>
      <UIButton :withoutIcon="true" @click="replenishBalance(false)">
        <p>Добавить</p>
      </UIButton>
    </div>
  </form>
</template>

<script setup>
import UIInput from './UIInput.vue';
import UIButton from './UIButton.vue';
import { balance } from '../../services/projectServices';
import { ref } from 'vue';

let localBalance = ref(balance());

const props = defineProps({
  isModalVisible: {
    type: Boolean,
  },
});
const emits = defineEmits(['update:isModalVisible']);

const replenishBalance = (data) => {
  if (data === false) {
    return emits('update:isModalVisible', data);
  } else {
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
