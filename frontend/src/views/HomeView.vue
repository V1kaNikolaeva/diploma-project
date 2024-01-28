<template>
  <div class="balance__wrapper">

    <div v-if="balance" class="balance">
      <p>Мой баланс: <strong>{{ balance }}</strong></p>
        <div class="button__wrapper">
          <UIButton :buttonType="'default'">
            <p>Изменить</p>
            <template #right-icon>
              <UIIcon icon="edit"/>
            </template>
          </UIButton>
        </div>
    </div>

    <div v-else-if="!balance" class="balance">
      <p>Денег нет!</p>
        <div class="button__wrapper">
          <UIButton :buttonType="'add'">
            <p>Пополнить</p>
            <template #right-icon>
              <UIIcon icon="add"/>
            </template>
          </UIButton>
        </div>
    </div>

  </div>

  <div class="wrapper__home">
    <div class="settings__wrapper">
      <SettingsBar v-model:isModalVisible="isModalVisible" :balance="balance" />
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
      let balance = ref(null)
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
