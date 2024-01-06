<template>
    <DoughnutChart v-if="chartData" :chartData="chartData" />
  </template>
  
  <script>
  import { DoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
  export default {
    name: 'BarChart',
    components: { DoughnutChart },
  
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartOptions: {
        type: Object,
        required: false
      }
    },
  
  }
  </script>