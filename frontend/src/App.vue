<script>
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';
import { useUserStore } from './stores/user';
import axios from 'axios';

export default {
  components: { NavigationBar },

  setup() {
    const userStore = useUserStore()
    return {

      userStore,
    }
  },

  created() {
    this.userStore.initStore()

    const token = this.userStore.user.access
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  }
  //Сделать глобальный тостер
}

</script>

<template>
  <NavigationBar/>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  margin-top: 150px;
}
</style>


