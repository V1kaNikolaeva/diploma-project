<template>
  <div class="cards__wrapper">
    <UICard
      v-for="card in sortedCards"
      :card="card"
      :category="card.category"
      :key="card.id"
    />
  </div>
</template>

<script setup>
import UICard from "../ui/UiCard.vue";
import { computed, ref } from "vue";


const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  sortQuantityType: {
    type: String,
    required: true,
    default: "common",
    validator: (value) => ["up", "down", "common"].includes(value),
  },
  sortCategoryType: {
    type: String,
    required: true,
    default: "all",
    // validator: (value) => ['up', 'down', 'common'].includes(value)
  },
});

let localCards = ref([...props.cards]);

const sortedCards = computed(() => {
  let currentSort = localCards.value.filter((item) =>
    props.sortCategoryType !== "all"
      ? item.category === props.sortCategoryType
      : localCards.value
  );

  if (props.sortQuantityType === "up") {
    return currentSort.sort((a, b) => a.quantity - b.quantity);
  } else if (props.sortQuantityType === "down") {
    return currentSort.sort((a, b) => b.quantity - a.quantity);
  } else if (props.sortQuantityType === "common") {
    return currentSort;
  }
});
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
