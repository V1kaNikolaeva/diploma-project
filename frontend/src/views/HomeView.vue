<template>
  <div class="incomes">
    <p>Мои деньги: {{ 2000 }}</p>
  </div>
  <div class="wrapper__home">
    <div class="settings__wrapper">
      <SettingsBar v-model:isModalVisible="isModalVisible" />
    </div>
    <div class="cards__wrapper">
      <TheCards/>
    </div>
  </div>
  <UIModalWindow v-if="isModalVisible" v-model:isModalVisible="isModalVisible" />
</template>

<script>
  import TheCards from '../components/TheCards.vue';
  import SettingsBar from '../components/SettingsBar.vue';
  import UIModalWindow from '../components/UIModalWindow.vue';

  export default {
    name: 'HomeView',
    components: { TheCards, SettingsBar, UIModalWindow },
    data() {
      return {
        isModalVisible: false,
      }
    },

  }

</script>

<style scoped>
.wrapper__home {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.settings__wrapper {
}

.cards__wrapper {
}
</style>
