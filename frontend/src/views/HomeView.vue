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
        v-model:modalFormType="modalFormType"
      />
    </div>
    <div class="cards__wrapper">
        <TheCards :cards="cards" :sortQuantityType="sortQuantityType" :sortCategoryType="sortCategoryType" />
    </div>
  </div>
  <UIModalWindow ref="innerModal" v-if="isModalVisible" v-model:isModalVisible="isModalVisible">
    <ReplenishBalanceForm
      v-if="modalFormType === 'replenishBalance'"
      v-model:isModalVisible="isModalVisible"
      v-model:balances="balances"
      labelName="Ведите сумму, которую хотите положить"
    />
    <CreateCardForm v-else-if="modalFormType === 'createCard'" v-model:isModalVisible="isModalVisible" />
    <BalanceHistory
      v-else-if="modalFormType === 'balanceHistory'"
      v-model:isModalVisible="isModalVisible"
      v-model:balances="balances"
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
import CreateCardForm from '../components/forms/CardForm.vue';
import BalanceHistory from '../components/common/BalanceHistory.vue';
import UIModalWindow from '../components/ui/UiModalWindow.vue';
import UIButton from '../components/ui/UiButton.vue';
import UIIcon from '../components/ui/UIIcon.vue';
import { computed, ref } from 'vue';
import { quantityFormatterRUB } from '../utils/quantityFormatters'
import { useBalanceAxios } from '../composables/useBalanceAxios';

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
    const { balances } = await useBalanceAxios();

    let isModalVisible = ref(false);

    let sortQuantityType = ref('common');
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


    let cards = ref([
      {
        id: 1,
        currencyCodeISO: "RUB",
        quantity: 2000,
        category: "products",
        reason: "Продукты на неделю",
      },
    ])

    return {
      balances,
      isModalVisible,
      modalFormType,
      sortQuantityType,
      sortCategoryType,
      replenishBalance,
      balanceHistory,
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

</style>
