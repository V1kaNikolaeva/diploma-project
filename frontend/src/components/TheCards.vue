<template>
  <div class="cards__wrapper">
    <UICard v-for="card in cards" :card="card" />
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
          reason: "Купил машину",
        },
        {
          id: 2,
          type: "income",
          currency: "₽",
          quantity: 200,
          reason:
            "Продал машину",
        },
        {
          id: 3,
          type: "income",
          currency: "₽",
          quantity: 200,
          reason: "Продал машину",
        },
        {
          id: 4,
          type: "income",
          currency: "₽",
          quantity: 200,
          reason: "Продал машину",
        },
        {
          id: 5,
          type: "income",
          currency: "₽",
          quantity: 200,
          reason: "Продал машину",
        },
        {
          id: 6,
          type: "income",
          currency: "₽",
          quantity: 200,
          reason: "Продал машину",
        },
        {
          id: 7,
          type: "expenses",
          currency: "₽",
          quantity: 100,
          reason: "Купил сырок",
        },
        {
          id: 8,
          type: "income",
          currency: "₽",
          quantity: 100,
          reason: "Продал сырок",
        },
        {
          id: 9,
          type: "income",
          currency: "₽",
          quantity: 1000,
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
