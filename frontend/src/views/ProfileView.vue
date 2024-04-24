<template>
  <div class="wrapper">
    <div class="account-info">
      <div class="name-contanier">
        <strong><p class="account-p">Имя:</p></strong>
        <p class="account-p mp">{{ userStore.user.name }}</p>
      </div>
      <div class="register-date-contanier">
        <strong><p class="account-p">Дата регистрации:</p></strong>
        <p class="account-p mp">{{ dateFormatterISO(userStore.user.date) }}</p>
      </div>
      <div class="stats-contanier">
        <strong><p class="account-p">Статистика</p></strong>
        <div class="stats">
          <p class="account-p">За все время вы {{ statsStore.stats.spending }} раза потратили деньги</p>
        </div>
        <div class="stats">
          <p class="account-p">За все время вы {{ statsStore.stats.balance }} заработали деньги</p>
        </div>
      </div>
      <div class="quit-change-contanier">
        <UiButton @click="change" class="button-default" :withoutIcon="true" buttonType="default"><p>Изменить данные</p></UiButton>
        <UiButton @click="quit" class="button-cancel" :withoutIcon="true" buttonType="cancel"><p>Выйти</p></UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { dateFormatterISO } from '../utils/dateFormatter';
import { useStatsStore } from '@/stores/stats';
import UiButton from '@/components/ui/UiButton.vue';
import { useRouter } from 'vue-router';
//выйти из акка
const userStore = useUserStore();
const statsStore = useStatsStore();
const router = useRouter();
const quit = () => {
  router.push({ name: 'login' });
  userStore.removeToken();
};
</script>

<style scoped>
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.account-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  margin: 20px;
}

.register-date-contanier,
.stats-contanier {
  margin-top: 40px;
}

.register-date-contanier,
.name-contanier {
  display: flex;
  flex-direction: row;
}
.stats {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.stats:last-child {
  margin-bottom: 0px;
}

.mp {
  margin-left: 20px;
}
.quit-change-contanier {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 450px;
  margin-top: 70px;
}
.button-default {
  width: 200px;
}

.button-cancel {
  width: 200px;
}

@media screen and (max-width: 768px) {
  .quit-change-contanier {
    flex-direction: column;
    justify-content: space-between;
    height: 150px
  }
}
</style>
