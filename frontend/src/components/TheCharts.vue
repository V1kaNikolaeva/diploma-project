<template>
  <UiDoughnutChart
    v-if="chartType === 'doughnutChart'"
    :chartData="{
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre', 'Autre', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5, 77, 80],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#A5C8ED', '#A5C8ED'],
        },
      ],
    }"
  >
  </UiDoughnutChart>
  <UiLineChart
    v-if="chartType === 'lineChart'"
    :chartData="{
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre', 'Autre', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5, 77, 80],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#A5C8ED', '#A5C8ED'],
        },
      ],
    }"
  >
  </UiLineChart>
  <UIBarChart
    v-if="chartType === 'barChart'"
    :chartData="{
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre', 'Autre', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5, 77, 80],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#A5C8ED', '#A5C8ED'],
        },
      ],
    }"
  >
  </UIBarChart>
</template>

<script setup>
import UIBarChart from '../components/UiBarChart.vue';
import UiLineChart from '../components/UiLineChart.vue';
import UiDoughnutChart from '../components/UiDoughnutChart.vue';

const props = defineProps({
  chartType: {
    type: String,
    required: true,
  },
});
</script>
