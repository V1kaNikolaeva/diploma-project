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
          quantity: 200,
          category: "products",
          reason: "Купил машину тут я описываю причину продажии все такое",
        },
        {
          id: 2,
          type: "expenses",
          currency: "₽",
          quantity: 200,
          category: "medications",
          reason:
            "Продал машину",
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
          quantity: 200,
          category: "medications",
          reason: "Продал машину",
        },
        {
          id: 5,
          type: "income",
          currency: "₽",
          quantity: 200,
          category: "medications",
          reason: "Продал машину",
        },
        {
          id: 6,
          type: "income",
          currency: "₽",
          quantity: 200,
          category: "medications",
          reason: "Продал машину",
        },
        {
          id: 7,
          type: "expenses",
          currency: "₽",
          quantity: 100,
          category: "medications",
          reason: "Купил сырок",
        },
        {
          id: 8,
          type: "income",
          currency: "₽",
          quantity: 100,
          category: "products",
          reason: "Продал сырок",
        },
        {
          id: 9,
          type: "income",
          currency: "₽",
          quantity: 1000,
          category: "products",
          reason: "Пришла зп",
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
