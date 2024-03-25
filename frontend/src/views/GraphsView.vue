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

<script setup>
import { ref } from 'vue';
import TheCharts from '../components/TheCharts.vue';
import UiSelect from '../components/UiSelect.vue';

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
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  datasets: [
    {
      data: [30, 50, 40, 30, 30, 70, 77, 37, 45, 70, 50, 30],
      backgroundColor: ['#A6F6FC', '#8BD4DA', '#55B98E', '#2CE293', '#07FF94', '#DBF965', '#EAFF94', '#FFF994', '#B494FF', '#9F94FF', '#447692', '#285875'],
    },
  ],
};
const balance = {
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  datasets: [
    {
      data: [30, 50, 40, 30, 30, 70, 77, 37, 45, 70, 50, 30],
      backgroundColor: ['#A6F6FC', '#8BD4DA', '#55B98E', '#2CE293', '#07FF94', '#DBF965', '#EAFF94', '#FFF994', '#B494FF', '#9F94FF', '#447692', '#285875'],
    },
  ],
};

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
