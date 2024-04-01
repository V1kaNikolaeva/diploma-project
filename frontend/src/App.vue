<script>
import { RouterView } from "vue-router";
import NavigationBar from "./components/common/NavigationBar.vue";
import { useUserStore } from "./stores/user";
import axios from "axios";
import { computed, ref } from "vue";

export default {
  components: { NavigationBar },

  setup() {
    const userStore = useUserStore();

    const userNameData = computed(() => {
      return userStore.getUserInfo().name;
    });

    let cards = ref([
      {
        id: 1,
        currencyCodeISO: "RUB",
        quantity: 2000,
        category: "products",
        reason: "Продукты на неделю",
      },
      {
        id: 2,
        currencyCodeISO: "RUB",
        quantity: 800,
        category: "entertainment",
        reason: "Билет в кино",
      },
      {
        id: 3,
        currencyCodeISO: "RUB",
        quantity: 25000,
        category: "electronics",
        reason: "Купил ноутбук",
      },
      {
        id: 4,
        currencyCodeISO: "RUB",
        quantity: 4500,
        category: "products",
        reason: "Продукты на неделю",
      },
      {
        id: 5,
        currencyCodeISO: "RUB",
        quantity: 3000,
        category: "products",
        reason: "Продукты на неделю",
      },
    ]);

    return {
      userNameData,
      userStore,
    };
  },

  beforeCreate() {
    this.userStore.initStore();

    const token = this.userStore.user.access;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },

  //Сделать глобальный тостер
};
</script>

<template>
  <NavigationBar :userName="userNameData" />
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  padding-top: 150px;
  padding-bottom: 150px;
}
</style>
