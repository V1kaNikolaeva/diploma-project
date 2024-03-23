<template>
    <LineChart v-if="chartData" :chartData="chartData" />
</template>
  
<script setup>
import { LineChart } from 'vue-chart-3';
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