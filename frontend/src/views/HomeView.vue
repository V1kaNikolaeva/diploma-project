<template>
  <div class="balance__wrapper">
    <div class="balance">
      <p>
        Мой баланс: <strong>{{ quantityFormatterRUB(amount) }}</strong>
      </p>
      <UIButton @click="replenishBalance" :border="false" :buttonType="'default'">
        <p>Пополнить</p>
        <template #right-icon>
          <UIIcon icon="add" />
        </template>
      </UIButton>
      <UIButton @click="balanceHistory" :border="false" :buttonType="'default'">
        <p>История пополнений</p>
        <template #right-icon>
          <UIIcon icon="archive" />
        </template>
      </UIButton>
    </div>
  </div>

  <div class="wrapper__home">
    <div class="settings__wrapper">
      <SettingsBar
        v-model:isModalVisible="isModalVisible"
        v-model:sortQuantityType="sortQuantityType"
        :balance="amount"
        v-model:sortCategoryType="sortCategoryType"
        v-model:sortQuantityByDate="sortQuantityByDate"
        v-model:modalFormType="modalFormType"
      />
    </div>
    <div v-if="spendings.length" class="cards__wrapper">
      <TheCards  v-model:spendings="spendings" :sortQuantityType="sortQuantityType" :sortQuantityByDate="sortQuantityByDate" :sortCategoryType="sortCategoryType" />
    </div>
    <div v-else-if="!spendings.length" class="no-spendings-contanier">
      <div class="no-spendings">
        <strong><p class="p-no-spendings">Тут ничего нет</p></strong>
        <p class="p-no-spendings">Создайте трату</p>
      </div>
    </div>
  </div>
  <UIModalWindow ref="innerModal" v-if="isModalVisible" v-model:isModalVisible="isModalVisible">
    <ReplenishBalanceForm
      v-if="modalFormType === 'replenishBalance'"
      v-model:isModalVisible="isModalVisible"
      v-model:balances="balances"
      labelName="Ведите сумму, которую хотите положить"
      @postBalance="postBalance"
    />
    <CreateCardForm v-else-if="modalFormType === 'createCard'" @postSpending="postSpending" v-model:isModalVisible="isModalVisible" />
    <BalanceHistory
      v-else-if="modalFormType === 'balanceHistory'"
      v-model:isModalVisible="isModalVisible"
      v-model:balances="balances"
      @updateBalance="updateBalance"
      @deleteBalance="deleteBalance"
    />
  </UIModalWindow>
  <UIButton class="user-bank__button" :buttonType="'cashVault'">
    <UIIcon :icon="'bank'"></UIIcon>
  </UIButton>
</template>

<script>
import TheCards from '../components/common/TheCards.vue';
import SettingsBar from '../components/common/SettingsBar.vue';
import ReplenishBalanceForm from '../components/forms/ReplenishBalanceForm.vue';
import CreateCardForm from '../components/forms/CreateCardForm.vue';
import BalanceHistory from '../components/common/BalanceHistory.vue';
import UIModalWindow from '../components/ui/UiModalWindow.vue';
import UIButton from '../components/ui/UiButton.vue';
import UIIcon from '../components/ui/UIIcon.vue';
import { computed, ref, watchEffect } from 'vue';
import { quantityFormatterRUB } from '../utils/quantityFormatters';
import { useBalanceAxios } from '../composables/useBalanceAxios';
import { useSpendingAxios } from '../composables/useSpendingAxios';
import { useStatsStore } from '../stores/stats';

export default {
  components: {
    TheCards,
    SettingsBar,
    ReplenishBalanceForm,
    CreateCardForm,
    BalanceHistory,
    UIModalWindow,
    UIButton,
    UIIcon,
  },

  async setup() {
    const [{ spendings }, { balances }] = await Promise.all([useSpendingAxios(), useBalanceAxios()]);
    const statsStore = useStatsStore();
    console.log(spendings.value)
    let isModalVisible = ref(false);

    let sortQuantityType = ref('common');
    let sortQuantityByDate = ref('common')
    let sortCategoryType = ref('all');

    let modalFormType = ref();
    const replenishBalance = () => {
      isModalVisible.value = true;
      modalFormType.value = 'replenishBalance';
    };

    const balanceHistory = () => {
      isModalVisible.value = true;
      modalFormType.value = 'balanceHistory';
    };

    const amount = computed(() => {
      return balances.value ? balances.value.reduce((acc, num) => acc + num.amount, 0) : 0;
    });

    //Обновляем 1 элемент массива
    const postBalance = (newItem) => {
      balances.value.unshift(newItem)
    };
    const postSpending = (newItem) => {
      spendings.value.unshift(newItem)
    };
    //Обновляем 1 элемент массива
    const updateBalance = (updatedItem) => {
      const itemIndex = balances.value.findIndex((item) => item.id === updatedItem.data.id);
      balances.value[itemIndex] = updatedItem.data;
    };
    const updateSpending = (updatedItem) => {
      const itemIndex = spendings.value.findIndex((item) => item.id === updatedItem.data.id);
      spendings.value[itemIndex] = updatedItem.data;
    };
    //Удаляем 1 элемент массива
    const deleteBalance = (deletedItem) => {
      const itemIndex = balances.value.findIndex((item) => item.id === deletedItem.deletedBalance);
      balances.value.splice(itemIndex, 1)
    };
    const deleteSpending = (deletedItem) => {
      const itemIndex = spendings.value.findIndex((item) => item.id === deletedItem.deletedBalance);
      spendings.value.splice(itemIndex, 1)
    };

    //Следим за состоянием (количество расходов и доходов для статы в профиле)
    watchEffect(() => {
      statsStore.setStats({
        spending: balances.value.length,
        balance: balances.value.length,
      });
    });

    let cards = ref([]);

    return {
      balances,
      spendings,
      isModalVisible,
      modalFormType,
      sortQuantityType,
      sortQuantityByDate,
      sortCategoryType,
      replenishBalance,
      balanceHistory,
      postBalance,
      updateBalance,
      deleteBalance,
      postSpending,
      updateSpending,
      deleteSpending,
      amount,
      quantityFormatterRUB,
      cards,
    };
  },
};
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 130px;
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

.settings__wrapper {
  width: 16em;
  flex: none;
}

.cards__wrapper {
  width: 65%;
}

.no-spendings-contanier {
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-spendings {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  outline: 1px solid var(--main-line);
  border-radius: 10px;
}
</style>
