<script>
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';
import { signupUser, loginUser } from '../projectServices';

export default {
  components: { NavigationBar },

  setup() {
    const userSignup = signupUser()
    const userLogin = loginUser()
    return {
      userSignup,
      userLogin
    }
  }
  //Сделать глобальный тостер
}

</script>

<template>
  <NavigationBar/>
  <main class="main">
    <RouterView :userSignup="userSignup" :userLogin="userLogin" />
  </main>
</template>

<style scoped>
.main {
  margin-top: 150px;
}
</style>


