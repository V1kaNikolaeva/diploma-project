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
