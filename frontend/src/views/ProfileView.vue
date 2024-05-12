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
          <p class="account-p">Всего расходов за все время: {{ statsStore.stats.spending }}</p>
        </div>
        <div class="stats">
          <p class="account-p">Всего доходов за все время: {{ statsStore.stats.balance }}</p>
        </div>
      </div>
      <div class="settings">
        <strong><p class="account-p">Настройки</p></strong>
        <div class="checkboxes-contanier" v-for="checkbox in checkboxes">
          <UiCheckbox
            v-model:checked="checkbox.checked"
            :checkboxText="checkbox.text"
            :id="checkbox.id"
            :value="checkbox.checked"
          />
        </div>
      </div>
      <div class="quit-change-contanier">
        <UiButton @click="" class="button-default" :withoutIcon="true" buttonType="default"
          ><p>Изменить данные</p></UiButton
        >
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
import UiCheckbox from '@/components/ui/UiCheckbox.vue';
import { useRouter } from 'vue-router';
import { useModalWindowStore } from '@/stores/modalWindow';
import { ref, watch } from 'vue';

const userStore = useUserStore();
const statsStore = useStatsStore();
const modalWindowStore = useModalWindowStore();

const checkboxes = ref([
  { 
    text: 'Больше не показывать окно при удалении', 
    checked: modalWindowStore.settings.showDeleteSpending, 
    id: 'showDeleteSpending' 
  },
  {
    text: 'Удалять без переключения',
    checked: modalWindowStore.settings.switchDeleteSpending,
    id: 'switchDeleteSpending',
  },
]);

watch(() => {
  modalWindowStore.setSettings({
    showDeleteSpending: checkboxes.value[0].checked,
    switchDeleteSpending: checkboxes.value[1].checked,
  })
})

const router = useRouter();
const quit = () => {
  router.push({ name: 'login' });
  userStore.removeToken();
  statsStore.removeToken();
  modalWindowStore.removeToken();
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
.stats-contanier,
.settings {
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
    height: 150px;
    width: auto;
  }
}
</style>
