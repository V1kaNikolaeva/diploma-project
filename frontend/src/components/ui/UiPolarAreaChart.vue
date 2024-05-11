<template>
    <PolarAreaChart v-if="chartData.datasets[0].data.length" :chartData="chartData" :options="chartOptions" />
    <UiNoData v-else-if="!chartData.datasets[0].data.length"></UiNoData>
</template>
  
<script setup>
import { PolarAreaChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import UiNoData from '../ui/UiNoData.vue'

Chart.register(...registerables);

const props = defineProps({
  chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: false
    }
});
</script>