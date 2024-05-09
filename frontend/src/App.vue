<script>
import { RouterView } from "vue-router";
import NavigationBar from "./components/common/NavigationBar.vue";
import { useUserStore } from "./stores/user";
import { useStatsStore } from "./stores/stats";
import { useModalWindowStore } from './stores/modalWindow'
import axios from "axios";

export default {
  components: { NavigationBar },

  setup() {
    const userStore = useUserStore();
    const statsStore = useStatsStore();
    const modalWindowStore = useModalWindowStore()

    return {
      userStore,
      statsStore,
      modalWindowStore,
    };
  },

  beforeCreate() {
    this.userStore.initStore();
    this.statsStore.initStore();
    this.modalWindowStore.initStore();
    const token = this.userStore.user.access;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },


  //Сделать глобальный тостер
};
/*
СПИСОК БАГОВ И ДОРАБОТОК
1. Advice
  - Найти советы и сверстать адаптивную страницу
2. Main
  - Доработать логику удаления и пополнения
  - Сверстать адаптив настроек (адекватный)
  - resize observer 
  - показывать удаляющююся трату
3. Graphs
  - Доработать дизайн графиков
4. Account 
  - Изменить настройки аккаунта (бэк и фронт сделать, 
    либо отказаться от фичи) )
5. Login / signin
  - Валидация
*/
</script>

<template>
  <NavigationBar :userName="userStore.user.name"/>
  <main class="main">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style scoped>
.main {
  padding-top: 150px;
  padding-bottom: 150px;
}
</style>
