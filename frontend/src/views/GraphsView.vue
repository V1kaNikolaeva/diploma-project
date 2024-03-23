<template>
  <div class="wrapper">
    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>На какую категорию вы потратили больше всего</p>
        <UiSelect :items="selectItems" v-model:modelValue="categoriesChart"></UiSelect>
      </div>
      <div class="chart-contanier">
        <TheCharts :chartType="categoriesChart"></TheCharts>
      </div>
    </div>

    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>За какой месяц вы потратили больше всего</p>
        <UiSelect :items="selectItems" v-model:modelValue="spentChart"></UiSelect>
      </div>
      <div class="chart-contanier">
        <TheCharts :chartType="spentChart"></TheCharts>
      </div>
    </div>

    <div class="chart__wrapper">
      <div class="select-contanier">
        <p>В какой месяц вы заработали больше всего</p>
        <UiSelect :items="selectItems" v-model:modelValue="balanceChart"></UiSelect>
      </div>
      <div class="chart-contanier">
        <TheCharts :chartType="balanceChart"></TheCharts>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TheCharts from '../components/TheCharts.vue';
import UiSelect from '../components/UiSelect.vue';

const selectItems = [
  { name: 'Круговая', value: 'doughnutChart' },
  { name: 'Столбцами', value: 'barChart' },
  { name: 'График', value: 'lineChart' },
];

let categoriesChart = ref('doughnutChart');
let spentChart = ref('doughnutChart');
let balanceChart = ref('doughnutChart');

let cards = ref([
  {
    id: 1,
    currencyCodeISO: 'RUB',
    quantity: 2000,
    category: 'products',
    reason: 'Продукты на неделю',
  },
  {
    id: 2,
    currencyCodeISO: 'RUB',
    quantity: 800,
    category: 'entertainment',
    reason: 'Билет в кино',
  },
  {
    id: 3,
    currencyCodeISO: 'RUB',
    quantity: 25000,
    category: 'electronics',
    reason: 'Купил ноутбук',
  },
  {
    id: 4,
    currencyCodeISO: 'RUB',
    quantity: 4500,
    category: 'products',
    reason: 'Продукты на неделю',
  },
  {
    id: 5,
    currencyCodeISO: 'RUB',
    quantity: 3000,
    category: 'products',
    reason: 'Продукты на неделю',
  },
]);
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
