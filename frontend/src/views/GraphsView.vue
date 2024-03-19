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
import UIBarChart from '../components/UiBarChart.vue';

let cards = ref([
  {
    id: 1,
    currencyCodeISO: "RUB",
    quantity: 2000,
    category: "products",
    reason: "Продукты на неделю",
  },
  {
    id: 2,
    currencyCodeISO: "RUB",
    quantity: 800,
    category: "entertainment",
    reason: "Билет в кино",
  },
  {
    id: 3,
    currencyCodeISO: "RUB",
    quantity: 25000,
    category: "electronics",
    reason: "Купил ноутбук",
  },
  {
    id: 4,
    currencyCodeISO: "RUB",
    quantity: 4500,
    category: "products",
    reason: "Продукты на неделю",
  },
  {
    id: 5,
    currencyCodeISO: "RUB",
    quantity: 3000,
    category: "products",
    reason: "Продукты на неделю",
  },
])


</script>
