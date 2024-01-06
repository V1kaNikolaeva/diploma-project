<script>
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';

export default {
  components: { NavigationBar }
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
