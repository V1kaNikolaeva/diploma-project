<template>
  <div class="balance__wrapper">
    <div class="balance">
      <p>
        Мой баланс: <strong>{{ amount }}</strong>
      </p>

      <div class="button__wrapper">
        <UIButton @click="replenishBalance" :border="false" :buttonType="'default'">
          <p>Пополнить</p>
          <template #right-icon>
            <UIIcon icon="edit" />
          </template>
        </UIButton>
      </div>
    </div>
  </div>

  <div class="wrapper__home">
    <div class="settings__wrapper">
      <SettingsBar
        v-model:isModalVisible="isModalVisible"
        v-model:sortQuantityType="sortQuantityType"
        :balance="amount"
        v-model:sortCategoryType="sortCategoryType"
        v-model:modalFormType="modalFormType"
      />
    </div>
    <div class="cards__wrapper">
      <TheCards :cards="cards" :sortQuantityType="sortQuantityType" :sortCategoryType="sortCategoryType" />
    </div>
  </div>
  <UIModalWindow v-if="isModalVisible" :isModalVisible="isModalVisible" >
    <ReplenishBalanceForm v-if="modalFormType === 'replenishBalance'" v-model:isModalVisible="isModalVisible"/>
    <CreateCardForm v-else-if="modalFormType === 'createCard'" v-model:isModalVisible="isModalVisible"/>
  </UIModalWindow>
  <UIButton class="user-bank__button" :buttonType="'cashVault'">
    <UIIcon :icon="'bank'"></UIIcon>
  </UIButton>
</template>

<script setup>
import TheCards from '../components/TheCards.vue';
import SettingsBar from '../components/SettingsBar.vue';
import ReplenishBalanceForm from '../components/ReplenishBalanceForm.vue'
import CreateCardForm from '../components/CreateCardForm.vue'
import UIModalWindow from '../components/UiModalWindow.vue';
import UIButton from '../components/UIButton.vue';
import UIIcon from '../components/UiIcon.vue';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

let isModalVisible = ref(false);
let sortQuantityType = ref('common');
let sortCategoryType = ref('all');

const modalFormTypes = ['createCard', 'replenishBalance']

let modalFormType = ref();
const replenishBalance = () => {
  isModalVisible.value = true;
  modalFormType.value = 'replenishBalance'
}

let cards = ref([
  {
    id: 1,
    currencyCodeISO: 'RUB',
    quantity: 2000,
    category: 'products',
    reason: 'Продукты на неделю',
    date: '2024-03-18',
  },
  {
    id: 2,
    currencyCodeISO: 'RUB',
    quantity: 800,
    category: 'entertainment',
    reason: 'Билет в кино',
    date: '2024-03-18',
  },
  {
    id: 3,
    currencyCodeISO: 'RUB',
    quantity: 25000,
    category: 'electronics',
    reason: 'Купил ноутбук',
    date: '2024-03-18',
  },
  {
    id: 4,
    currencyCodeISO: 'RUB',
    quantity: 4500,
    category: 'products',
    reason: 'Продукты на неделю',
    date: '2024-03-18',
  },
  {
    id: 5,
    currencyCodeISO: 'RUB',
    quantity: 3000,
    category: 'products',
    reason: 'Продукты на неделю',
    date: '2016-01-01',
  },
]);

let balances = ref();
const route = useRoute()
const getUserBalance = async () => {
  await axios
    .get(`/api/balance/${route.params.id}`)
    .then((response) => {
      balances.value = Object.values(response.data).flat()
      console.log(balances.value)
    })
    .catch((error) => {
      console.log('error', error);
    });
};

onMounted(() => {
  getUserBalance()
})

const amount = computed(() => {
  return balances.value ? balances.value.reduce((acc, num) => acc + num.amount,  0) : 0
})

// const addBalance = async () => {
//   await axios
//     .post('/api/balance/create/', { 'amount': amount.value })
//     .then((response) => {
//       console.log(response.data);
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log('error', error);
//     });
// }
</script>

<style scoped>
.balance__wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
.balance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.button__wrapper {
  margin: 10px;
}
.wrapper__home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
}

.settings__wrapper {
  width: 16em;
  flex: none;
}

.user-bank__button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
