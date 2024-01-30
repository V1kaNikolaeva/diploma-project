<template>
  <div class="cards__wrapper">
    <UICard v-for="card in cards" :card="card" :category="card.category" />
  </div>
</template>

<script>
import UICard from "./UICard.vue";

export default {
  name: "TheCards",
  components: { UICard },
  data() {
    return {
      cards: [
        {
          id: 1,
          type: "expenses",
          currency: "₽",
          quantity: 2000,
          category: "products",
          reason: "Продукты на неделю",
        },
        {
          id: 2,
          type: "expenses",
          currency: "₽",
          quantity: 800,
          category: "entertainment",
          reason:
            "Билет в кино",
        },
        {
          id: 3,
          type: "expenses",
          currency: "₽",
          quantity: 25000,
          category: "electronics",
          reason: "Купил ноутбук",
        },
        {
          id: 4,
          type: "expenses",
          currency: "₽",
          quantity: 200000,
          category: "trips",
          reason: "Слетал в Китай",
        },
        {
          id: 5,
          type: "income",
          currency: "₽",
          quantity: 3000,
          category: "cloth",
          reason: "Штаны",
        },
        {
          id: 6,
          type: "income",
          currency: "₽",
          quantity: 7000,
          category: "present",
          reason: "Подарки на Новый Год",
        },
        {
          id: 7,
          type: "expenses",
          currency: "₽",
          quantity: 1000,
          category: "medications",
          reason: "Лекарства",
        },
        {
          id: 8,
          type: "income",
          currency: "₽",
          quantity: 4000,
          category: "other",
          reason: "Коммуналка",
        },
      ],
    };
  },

};

</script>

<style scoped>
.cards__wrapper {
  display: grid;
  justify-content: center;
  grid-template-columns: 
    minmax(auto, 400px)
    minmax(auto, 400px) 
    minmax(auto, 400px);

}


</style>
