<template>
    <BarChart v-if="chartData" :chartData="chartData" :options="chartOptions"  />
</template>
  
<script setup>
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

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