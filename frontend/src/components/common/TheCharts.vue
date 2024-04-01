<template>
  <UiDoughnutChart
    v-if="chartType === 'doughnutChart'"
    :chartData="chartData"
    :chartOptions="{
      borderColor: '#474747',
      borderWidth: 3,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
    }"
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
      elements: {
        point: {
          pointRadius: 6,
          pointHoverRadius: 9,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#474747',
          },
        },

        x: {
          grid: {
            color: '#474747',
          },
        },
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      borderWidth: 3,

      borderColor: '#474747',
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
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#474747',
          },
        },

        x: {
          grid: {
            color: '#474747',
          },
        },
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      borderWidth: 3,
      borderColor: '#474747',
    }"
  >
  </UIBarChart>
  <UiPolarAreaChart
    v-if="chartType === 'polarAreaChart'"
    :chartData="chartData"
    :chartOptions="{
      plugins: {
        legend: {
          display: false,
          tooltip: false,
        },
      },
      scales: {
        r: {
          grid: {
            color: '#474747',
          },
          ticks: {
            display: false,
          },
          pointLabels: {
            display: true,
            centerPointLabels: true,
          },
        },
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      borderWidth: 3,
      borderColor: '#474747',
    }"
  >
  </UiPolarAreaChart>
</template>

<script setup>
import UIBarChart from '../ui/UiBarChart.vue';
import UiLineChart from '../ui/UiLineChart.vue';
import UiDoughnutChart from '../ui/UiDoughnutChart.vue';
import UiPolarAreaChart from '../ui/UiPolarAreaChart.vue';

const props = defineProps({
  chartType: {
    type: String,
    required: true,
  },
  chartData: {
    type: Object,
    required: true,
  },
});
</script>
