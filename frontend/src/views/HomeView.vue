<template>
  <div class="balance__wrapper">
    <div v-if="balance" class="balance">
      <p>
        Мой баланс: <strong>{{ balance }}</strong>
      </p>
      <div class="button__wrapper">
        <UIButton @click="userBalance" :border="false" :buttonType="'default'">
          <p>Изменить</p>
          <template #right-icon>
            <UIIcon icon="edit" />
          </template>
        </UIButton>
      </div>
    </div>

    <div v-else-if="!balance" class="balance">
      <p>Денег нет!</p>
      <div class="button__wrapper">
        <UIButton :border="false" :buttonType="'add'">
          <p>Пополнить</p>
          <template #right-icon>
            <UIIcon icon="add" />
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
        :balance="balance"
        v-model:sortCategoryType="sortCategoryType"
      />
    </div>
    <div class="cards__wrapper">
      <TheCards
        :cards="cards"
        :sortQuantityType="sortQuantityType"
        :sortCategoryType="sortCategoryType"
      />
    </div>
  </div>
  <UIModalWindow
    v-if="isModalVisible"
    v-model:isModalVisible="isModalVisible"
  />
  <UIButton class="user-bank__button" :buttonType="'cashVault'">
    <UIIcon :icon="'bank'"></UIIcon>
  </UIButton>
</template>

<script setup>
import TheCards from "../components/TheCards.vue";
import SettingsBar from "../components/SettingsBar.vue";
import UIModalWindow from "../components/UiModalWindow.vue";
import UIButton from "../components/UIButton.vue";
import UIIcon from "../components/UiIcon.vue";
import { ref } from "vue";
import axios from "axios";

let isModalVisible = ref(false);
let balance = ref(111110);
let sortQuantityType = ref("common");
let sortCategoryType = ref("all");

let cards = ref([
  {
    id: 1,
    currencyCodeISO: "RUB",
    quantity: 2000,
    category: "products",
    reason: "Продукты на неделю",
    date: "2024-03-18",
  },
  {
    id: 2,
    currencyCodeISO: "RUB",
    quantity: 800,
    category: "entertainment",
    reason: "Билет в кино",
    date: "2024-03-18",
  },
  {
    id: 3,
    currencyCodeISO: "RUB",
    quantity: 25000,
    category: "electronics",
    reason: "Купил ноутбук",
    date: "2024-03-18",
  },
  {
    id: 4,
    currencyCodeISO: "RUB",
    quantity: 4500,
    category: "products",
    reason: "Продукты на неделю",
    date: "2024-03-18",
  },
  {
    id: 5,
    currencyCodeISO: "RUB",
    quantity: 3000,
    category: "products",
    reason: "Продукты на неделю",
    date: "2016-01-01",
  },
]);

let data;
const userBalance = async () => {
  await axios
    .get("/api/balance/")
    .then((response) => {
      console.log(response.data);
      data = response.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
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

.cards__wrapper {
}

.user-bank__button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
