<template>
  <div class="balance__wrapper">

    <div v-if="balance" class="balance">
      <p>Мои баланс: <strong>{{ balance }}</strong></p>
      <div class="button__wrapper">
        <UIIcon icon="edit" />
      </div>
    </div>

    <p v-else-if="!balance">Мои баланс: </p>

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
  import UIButton from '../components/UIButton.vue';
  import UIIcon from '../components/UIIcon.vue';
  import { ref } from 'vue';

  export default {
    name: 'HomeView',
    components: { TheCards, SettingsBar, UIModalWindow, UIButton, UIIcon },

    setup() {
      let isModalVisible = ref(false)
      let balance = ref(1000)
      return {
        isModalVisible,
        balance,
      }
    }

  }

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
  flex-direction: row;
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
</style>
