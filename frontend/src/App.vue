<script>
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';
import { createUser } from '../projectServices';

export default {
  components: { NavigationBar },

  setup() {
    const user = createUser()

    return {
      user,
    }
  }
  //Сделать глобальный тостер
}

</script>

<template>
  <NavigationBar/>
  <main class="main">
    <RouterView :user="user" />
  </main>
</template>

<style scoped>
.main {
  margin-top: 150px;
}
</style>


