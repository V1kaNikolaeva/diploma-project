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
  <!-- <p>
  {{ spendingAmount }}
  {{ balanceAmount }}

</p> -->
  <div class="wrapper__home">
    <Teleport to=".nav-contanier" :disabled="userWidth > 768">
      <div class="settings__wrapper">
        <SettingsBar
          v-model:isModalVisible="isModalVisible"
          :oneMounth="oneMounth"
          v-model:sortQuantityType="sortQuantityType"
          :balance="amount"
          v-model:sortCategoryType="sortCategoryType"
          v-model:sortQuantityByDate="sortQuantityByDate"
          v-model:modalFormType="modalFormType"
          v-model:deleteSpendingMode="deleteSpendingMode"
          v-model:spendingMode="spendingMode"
        />
      </div>
    </Teleport>
    <div v-if="spendings.length" class="cards__wrapper">
      <TheCards
        :spendings="spendings"
        :sortQuantityType="sortQuantityType"
        :sortQuantityByDate="sortQuantityByDate"
        :sortCategoryType="sortCategoryType"
        v-model:deleteSpendingMode="deleteSpendingMode"
        v-model:spendingMode="spendingMode"
        v-model:updatedData="updatedData"
        v-model:deletedData="deletedData"
        v-model:oneMounth="oneMounth"
        v-model:deleteSpendingId="deleteSpendingId"
        v-model:isModalVisible="isModalVisible"
        v-model:modalFormType="modalFormType"
        @deleteSpending="deleteSpending"
      />
    </div>
    <div v-else-if="!spendings.length" class="no-spendings-contanier">
      <div class="no-spendings">
        <strong><p class="p-no-spendings">Тут ничего нет</p></strong>
        <p class="p-no-spendings">Создайте трату</p>
      </div>
    </div>
  </div>
  <UIModalWindow ref="innerModal" v-if="isModalVisible" v-model:isModalVisible="isModalVisible">
    <BalanceForm
      v-if="modalFormType === 'replenishBalance'"
      v-model:isModalVisible="isModalVisible"
      v-model:balances="balances"
      labelName="Ведите сумму, которую хотите положить"
      @postBalance="postBalance"
    />
    <CardForm
      v-else-if="modalFormType === 'createCard'"
      @postSpending="postSpending"
      :balanceAmount="amount"
      v-model:isModalVisible="isModalVisible"
    />
    <CardForm
      v-else-if="modalFormType === 'updateCard'"
      v-model:updatedData="updatedData"
      @updateSpending="updateSpending"
      :balanceAmount="amount"
      v-model:isModalVisible="isModalVisible"
    />
    <BalanceHistory
      v-else-if="modalFormType === 'balanceHistory'"
      v-model:isModalVisible="isModalVisible"
      v-model:balances="balances"
      :balanceAmount="amount"
      @updateBalance="updateBalance"
      @deleteBalance="deleteBalance"
    />
    <TheWarning
      v-else-if="
        modalFormType === 'deleteSpending' && JSON.parse(modalWindowStore.settings.showDeleteSpending) == false
      "
      v-model:isModalVisible="isModalVisible"
      v-model:deleteSpendingCheckboxes="deleteSpendingCheckboxes"
      @deleteSpending="deleteSpending"
      @storeSettings="storeSettings"
      warningText="Вы действительно хотите удалить эту затрату?"
    >
      <UiCard
        :one_spending="deletedData.spending"
        :reason="deletedData.reason"
        :spending_type="deletedData.spendingType"
        :deleteSpendingMode="false"
        spending-mode=""
      />
    </TheWarning>
  </UIModalWindow>
  <!-- <UIButton class="user-bank__button" :buttonType="'cashVault'">
    <UIIcon :icon="'bank'"></UIIcon>
  </UIButton> -->
</template>

<script>
import TheCards from '../components/common/TheCards.vue';
import SettingsBar from '../components/common/SettingsBar.vue';
import BalanceForm from '../components/forms/BalanceForm.vue';
import CardForm from '../components/forms/CardForm.vue';
import BalanceHistory from '../components/common/BalanceHistory.vue';
import TheWarning from '../components/common/TheWarning.vue';
import UIModalWindow from '../components/ui/UiModalWindow.vue';
import UIButton from '../components/ui/UiButton.vue';
import UiCard from '../components/ui/UiCard.vue';
import UIIcon from '../components/ui/UIIcon.vue';
import { computed, ref, watchEffect } from 'vue';
import { quantityFormatterRUB } from '../utils/quantityFormatters';
import { useBalanceAxios } from '../composables/useBalanceAxios';
import { useSpendingAxios } from '../composables/useSpendingAxios';
import { useUserWidthObserver } from '../composables/useUserWidthObserver';
import { useStatsStore } from '../stores/stats';
import { useModalWindowStore } from '../stores/modalWindow';
import { deleteSpendingAPI } from '@/api/spending';

export default {
  components: {
    TheCards,
    SettingsBar,
    BalanceForm,
    CardForm,
    BalanceHistory,
    TheWarning,
    UIModalWindow,
    UIButton,
    UIIcon,
    UiCard,
  },

  async setup() {
    const [{ spendings }, { balances }] = await Promise.all([useSpendingAxios(), useBalanceAxios()]);
    const statsStore = useStatsStore();
    //Функция для установки статы для профиля
    const setProfileStats = () => {
      statsStore.setStats({
        spending: spendings.value.length,
        balance: balances.value.length,
      });
    };
    setProfileStats()


    let isModalVisible = ref(false);

    let sortQuantityType = ref('common');
    let sortQuantityByDate = ref('common');
    let sortCategoryType = ref('all');
    let oneMounth = ref(true);

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
      return balances.value
        ? balances.value.reduce((acc, num) => acc + num.amount, 0) -
            spendings.value.reduce((acc, num) => acc + num.one_spending, 0)
        : 0;
    });
    const balanceAmount = computed(() => {
      return balances.value ? balances.value.reduce((acc, num) => acc + num.amount, 0) : 0;
    });
    const spendingAmount = computed(() => {
      return spendings.value ? spendings.value.reduce((acc, num) => acc + num.one_spending, 0) : 0;
    });

    //Обновляем 1 элемент массива
    const postBalance = (newItem) => {
      balances.value.unshift(newItem);
      setProfileStats();
    };
    const postSpending = (newItem) => {
      spendings.value.unshift(newItem);
      setProfileStats();
    };
    //Обновляем 1 элемент массива
    const updateBalance = (updatedItem) => {
      const itemIndex = balances.value.findIndex((item) => item.id === updatedItem.data.id);
      balances.value[itemIndex] = updatedItem.data;
      setProfileStats();
    };

    const spendingMode = ref('');
    const updatedData = ref();
    const updateSpending = (updatedItem) => {
      spendingMode.value = '';
      const itemIndex = spendings.value.findIndex((item) => item.id === updatedItem.data.id);
      spendings.value[itemIndex] = updatedItem.data;
      setProfileStats();
    };
    //Удаляем 1 элемент массива
    const deleteBalance = (deletedItem) => {
      const itemIndex = balances.value.findIndex((item) => item.id === deletedItem.deletedBalance);
      balances.value.splice(itemIndex, 1);
      setProfileStats();
    };

    let deleteSpendingMode = ref(false);
    const modalWindowStore = useModalWindowStore();
    watchEffect(() => {
      if (JSON.parse(modalWindowStore.settings.switchDeleteSpending) == false) {
        deleteSpendingMode.value = false;
      }
    });

    const deleteSpendingId = ref();
    const deletedData = ref();
    const deleteSpending = async () => {
      deletedData.value = null;
      const answer = await deleteSpendingAPI(deleteSpendingId.value);
      const itemIndex = spendings.value.findIndex((item) => item.id === answer.deletedSpending);
      spendings.value.splice(itemIndex, 1);
      if (JSON.parse(modalWindowStore.settings.switchDeleteSpending) == false) {
        deleteSpendingMode.value = false;
      }
      setProfileStats();
    };


    const deleteSpendingCheckboxes = ref([
      { text: 'Больше не показывать', checked: modalWindowStore.settings.showDeleteSpending, id: 'showDeleteSpending' },
      {
        text: 'Удалять без переключения',
        checked: modalWindowStore.settings.switchDeleteSpending,
        id: 'switchDeleteSpending',
      },
    ]);

    const storeSettings = (selected) => {
      if (selected) {
        modalWindowStore.setSettings({
          showDeleteSpending: selected[0].checked,
          switchDeleteSpending: selected[1].checked,
        });
      }
    };

    const { userWidth } = useUserWidthObserver();

    return {
      balances,
      spendings,
      isModalVisible,
      modalFormType,
      sortQuantityType,
      sortQuantityByDate,
      sortCategoryType,
      oneMounth,
      replenishBalance,
      balanceHistory,
      postBalance,
      updateBalance,
      deleteBalance,
      postSpending,
      updatedData,
      deletedData,
      updateSpending,
      deleteSpending,
      amount,
      balanceAmount,
      spendingAmount,
      quantityFormatterRUB,
      deleteSpendingMode,
      spendingMode,
      deleteSpendingCheckboxes,
      modalWindowStore,
      storeSettings,
      deleteSpendingId,
      deleteSpendingAPI,
      setProfileStats,
      userWidth,
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
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* RmTmHr5J */
.no-spendings {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  outline: 1px solid var(--main-line);
  border-radius: 10px;
}

@media (max-width: 768px) {
  .wrapper__home {
    flex-direction: column;
    align-items: center;
  }
  .cards__wrapper {
    width: auto;
  }
  .settings__wrapper {
    width: auto;
  }
}
</style>
