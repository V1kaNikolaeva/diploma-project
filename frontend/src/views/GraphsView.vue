<template>
  <div class="wrapper">
    <div class="graphs-year">
      <UiSelect labelText="Выберите год" :items="selectedYears" v-model:modelValue="selectedYear"></UiSelect>
    </div>
    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>На какую категорию вы потратили больше всего</p>
        <UiSelect
          labelText="Тип диаграммы"
          class="select-charts"
          :items="selectItems"
          v-model:modelValue="categoriesChart"
        ></UiSelect>
      </div>
      <div class="chart-contanier">
        <TheCharts :chartType="categoriesChart" :chartData="categories"></TheCharts>
      </div>
    </div>

    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>За какой месяц вы потратили больше всего</p>
        <UiSelect
          labelText="Тип диаграммы"
          class="select-charts"
          :items="selectItems"
          v-model:modelValue="spentChart"
        ></UiSelect>
      </div>
      <div class="chart-contanier">
        <TheCharts :chartType="spentChart" :chartData="spent"></TheCharts>
      </div>
    </div>

    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>В какой месяц вы заработали больше всего</p>
        <UiSelect
          labelText="Тип диаграммы"
          class="select-charts"
          :items="selectItems"
          v-model:modelValue="balanceChart"
        ></UiSelect>
      </div>
      <div class="chart-contanier">
        <TheCharts :chartType="balanceChart" :chartData="balance"></TheCharts>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import TheCharts from '../components/common/TheCharts.vue';
import UiSelect from '../components/ui/UiSelect.vue';
import { useBalanceAxios } from '@/composables/useBalanceAxios';
import { useSpendingAxios } from '@/composables/useSpendingAxios';
import { useUserStore } from '@/stores/user';

export default {
  components: { TheCharts, UiSelect },
  async setup() {
    const userStore = useUserStore();
    const selectItems = [
      { name: 'Круговая', value: 'doughnutChart' },
      { name: 'Столбцами', value: 'barChart' },
      { name: 'График', value: 'lineChart' },
      { name: 'Радар', value: 'polarAreaChart' },
    ];

    const categoriesChart = ref('doughnutChart');
    const spentChart = ref('doughnutChart');
    const balanceChart = ref('doughnutChart');
    const selectedYear = ref('all');

    const selectedYears = computed(() => {
      const currentDate = new Date().getFullYear();
      const userDate = new Date(userStore.user.date).getFullYear();
      let years = [{ name: 'Все года', value: 'all' }];
      if (currentDate === userDate) {
        years.push({ name: currentDate, value: currentDate });
      } else {
        for (let i = userDate; i <= currentDate; i++) {
          years.push({ name: i, value: i });
        }
      }
      return years;
    });

    const [{ spendings }, { balances }] = await Promise.all([useSpendingAxios(), useBalanceAxios()]);

    const categoriesDatasets = computed(() => {
      let data = [];
      const total = spendings.value.reduce(
        (totals, spending) => {
          const category = spending.spending_type;
          const spendingYear = new Date(spending.created_at).getFullYear();

          // totals[category] = totals[category] || 0;
          if (selectedYear.value !== 'all' && selectedYear.value === spendingYear) {
            console.log(selectedYear.value, spendingYear);
            totals[category] += spending.one_spending;
          }
          if (selectedYear.value === 'all') {
            totals[category] += spending.one_spending;
          }
          return totals;
        },
        {
          medications: 0,
          products: 0,
          entertainment: 0,
          electronics: 0,
          trips: 0,
          cloth: 0,
          present: 0,
          other: 0,
        },
      );

      for (let i in total) {
        data.push(total[i]);
      }
      if (data.every((item) => item === 0)) {
        return [];
      } else {
        return data;
      }
    });

    const categories = ref({
      labels: ['Здоровье', 'Продукты', 'Развлечения', 'Электроника', 'Путешествия', 'Одежда', 'Подарки', 'Другое'],
      datasets: [
        {
          data: categoriesDatasets,
          backgroundColor: ['#FF6666', '#B2FF66', '#66FFB2', '#C0C0C0', '#66FFFF', '#FFB266', '#FFFF66', '#606060'],
        },
      ],
    });

    const spentDatasets = computed(() => {
      const total = spendings.value.reduce(
        (totals, spending) => {
          const mounth = new Date(spending.created_at).getMonth();
          const spendingYear = new Date(spending.created_at).getFullYear();

          if (selectedYear.value !== 'all' && selectedYear.value === spendingYear) {
            totals[mounth] += spending.one_spending;
          }
          if (selectedYear.value === 'all') {
            totals[mounth] += spending.one_spending;
          }
          return totals;
        },
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      );

      if (total.every((item) => item === 0)) {
        return [];
      } else {
        return total;
      }
    });
    const spent = ref({
      labels: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      datasets: [
        {
          data: spentDatasets,
          backgroundColor: [
            '#A6F6FC',
            '#8BD4DA',
            '#55B98E',
            '#2CE293',
            '#07FF94',
            '#DBF965',
            '#EAFF94',
            '#FFF994',
            '#B494FF',
            '#9F94FF',
            '#447692',
            '#285875',
          ],
        },
      ],
    });

    const balanceDatasets = computed(() => {
      const total = balances.value.reduce(
        (totals, balance) => {
          const mounth = new Date(balance.created_at).getMonth();
          const balanceYear = new Date(balance.created_at).getFullYear();

          if (selectedYear.value !== 'all' && selectedYear.value === balanceYear) {
            totals[mounth] += balance.amount;
          }
          if (selectedYear.value === 'all') {
            totals[mounth] += balance.amount;
          }
          return totals;
        },
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      );

      if (total.every((item) => item === 0)) {
        return [];
      } else {
        return total;
      }
    });

    const balance = ref({
      labels: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      datasets: [
        {
          data: balanceDatasets,
          backgroundColor: [
            '#A6F6FC',
            '#8BD4DA',
            '#55B98E',
            '#2CE293',
            '#07FF94',
            '#DBF965',
            '#EAFF94',
            '#FFF994',
            '#B494FF',
            '#9F94FF',
            '#447692',
            '#285875',
          ],
        },
      ],
    });

    return {
      balances,
      spendings,
      selectItems,
      selectedYear,
      categoriesChart,
      spentChart,
      balanceChart,
      categories,
      spent,
      balanceDatasets,
      spentDatasets,
      categoriesDatasets,
      balance,
      userStore,
      useUserStore,
      selectedYears,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
}
.graphs-year {
  display: flex;
  align-items: start;
  width: 100%;
}
.chart__wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 30px;
}
.select-charts {
  margin-top: 20px;
}
.chart-contanier {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--card-color);
  padding: 10px;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  height: 400px;
  max-width: 400px;
}

@media screen and (max-width: 768px) {
  .chart__wrapper {
    padding: 20px;
    flex-direction: column;
    height: 600px;
    margin: 0;
  }

  .select-contanier {
    margin: 20px 0px 20px 0px;
  }

  .graphs-year {
    padding: 0px 20px 0px 20px;
  }

  .select-contanier {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chart-contanier {
    margin: 20px 0px 20px 0px;
  }
}
</style>
