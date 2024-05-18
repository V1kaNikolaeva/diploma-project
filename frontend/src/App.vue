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
  - Найти советы и сверстать адаптивную страницу DONE
2. Main
  - Доработать логику удаления и пополнения DONE
  - Сверстать адаптив настроек (адекватный) DONE
  - resize observer DONE (без тротлинга)
  - показывать удаляющююся трату DONE
3. Graphs
  - Доработать дизайн графиков DONE
4. Account 
  - Изменить настройки аккаунта (бэк и фронт сделать, 
    либо отказаться от фичи) )
  - Код на почту по идее должен приходить)
5. Login / signin
  - Валидация DONE
6. Проверить как реагируют компоненты на отсутствие данных (трат нет, истории нет) DONE
7. В профиле статистика, путаница с родами DONE
8. PUT запрос на изменения расхода невозможен, если ничего не меняли, но нажали изменить
9. Фикс навигации при мобильной версии DONE
10. Можно добавить в статистику средния показания расхода (по категориям) и дохода
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
