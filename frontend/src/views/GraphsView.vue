<template>
  <div class="wrapper">
    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>На какую категорию вы потратили больше всего</p>
        <UiSelect :items="selectItems" v-model:modelValue="categoriesChart"></UiSelect>
      </div>
      <div class="chart-contanier">
        <TheCharts :chartType="categoriesChart" :chartData="categories"></TheCharts>
      </div>
    </div>

    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>За какой месяц вы потратили больше всего</p>
        <UiSelect :items="selectItems" v-model:modelValue="spentChart"></UiSelect>
      </div>
      <div class="chart-contanier">
        <TheCharts :chartType="spentChart" :chartData="spent"></TheCharts>
      </div>
    </div>

    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>В какой месяц вы заработали больше всего</p>
        <UiSelect :items="selectItems" v-model:modelValue="balanceChart"></UiSelect>
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

export default {
  components: { TheCharts, UiSelect },
  async setup() {
    const { balances } = await useBalanceAxios();
    const selectItems = [
      { name: 'Круговая', value: 'doughnutChart' },
      { name: 'Столбцами', value: 'barChart' },
      { name: 'График', value: 'lineChart' },
      { name: 'Пузырьком', value: 'polarAreaChart' },
    ];

    let categoriesChart = ref('doughnutChart');
    let spentChart = ref('doughnutChart');
    let balanceChart = ref('doughnutChart');

    const categories = {
      labels: ['Здоровье', 'Продукты', 'Развлечения', 'Электроника', 'Путешествия', 'Одежда', 'Подарки', 'Другое'],
      datasets: [
        {
          data: [30, 50, 30, 30, 30, 70, 30, 30],
          backgroundColor: ['#FF6666', '#B2FF66', '#66FFB2', '#C0C0C0', '#66FFFF', '#FFB266', '#FFFF66', '#606060'],
        },
      ],
    };
    const spent = {
      labels: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
      ],
      datasets: [
        {
          data: [30, 50, 40, 30, 30, 70, 77, 37, 45, 70, 50, 30],
          backgroundColor: [ '#A6F6FC', '#8BD4DA', '#55B98E', '#2CE293', '#07FF94', '#DBF965', '#EAFF94', '#FFF994', '#B494FF', '#9F94FF', '#447692', '#285875',
          ],
        },
      ],
    };

    const balanceDatasets = computed(() => {
      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < balances.value.length; i++) {
        if (balances.value[i].created_at_formated.slice(3, 5).indexOf('0') === 0) {
          data[Number(balances.value[i].created_at_formated.slice(3, 5).replace('0', '')) - 1] += balances.value[i].amount
        } else {
          data[Number(balances.value[i].created_at_formated.slice(3, 5)) - 1] += balances.value[i].amount
        }
      }
      return data
    })

    const balance = {
      labels: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
      ],
      datasets: [
        {
          data: balanceDatasets.value,
          backgroundColor: [ '#A6F6FC', '#8BD4DA', '#55B98E', '#2CE293', '#07FF94', '#DBF965', '#EAFF94', '#FFF994', '#B494FF', '#9F94FF', '#447692', '#285875',
          ],
        },
      ],
    };

    return {
      balances,
      selectItems,
      categoriesChart,
      spentChart,
      balanceChart,
      categories,
      spent,
      balanceDatasets,
      balance,

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

.chart__wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 30px;
}
</style>
