<template>
  <UIBarChart :chartData="
    {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: 
      [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    }">
    
  </UIBarChart>  
</template>

<script setup>
import { ref } from 'vue';
import UIBarChart from '../components/UIBarChart.vue';

const chartData = ref()

</script>
