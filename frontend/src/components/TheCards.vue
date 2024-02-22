<template>
  <div class="cards__wrapper">
    <UICard v-for="card in localCards" :card="card" :category="card.category" :key="card.id" />
  </div>
</template>

<script setup>
import UICard from "./UICard.vue";
import { ref, watch } from "vue";

const props = defineProps({
  cards: {
   type: Array,
   required: true, 
  },
  sortQuantityType: {
    type: String,
    required: true,
    default: 'common',
    validator: (value) => ['up', 'down', 'common'].includes(value)
  }
})

let localCards = ref([...props.cards])

//От меньшего к большему
const sortQuantityUp = () => {
  localCards.value = localCards.value.sort((a, b) => a.quantity - b.quantity)
}

//От большего к меньшему
const sortQuantityDown = () => {
  localCards.value = localCards.value.sort((a, b) => b.quantity - a.quantity)
}

//Изначальный вид
const sortQuantityCommon = () => {
  localCards = ref([...props.cards])
}

const sortType = watch(() => {
  if (props.sortQuantityType === 'up') {
    localCards.value = localCards.value.sort((a, b) => a.quantity - b.quantity)
  }
  if (props.sortQuantityType === 'down') {
    localCards.value = localCards.value.sort((a, b) => b.quantity - a.quantity)
  }
  if (props.sortQuantityType === 'common') {
    localCards = ref([...props.cards])
  }

})

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
