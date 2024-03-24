<template>
  <UiDoughnutChart
    v-if="chartType === 'doughnutChart'"
    :chartData="chartData"
  >
  </UiDoughnutChart>
  <UiLineChart
    v-if="chartType === 'lineChart'"
    :chartData="chartData"

    :chartOptions="{
      plugins: {
        legend: {
          display: false,
        },
      },
    }"
  >
  </UiLineChart>
  <UIBarChart
    v-if="chartType === 'barChart'"
    :chartData="chartData"
    :chartOptions="{
      plugins: {
        legend: {
          display: false,
        },
      },
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
  chartData: {
    type: Object,
    required: true,
  }
});
</script>
