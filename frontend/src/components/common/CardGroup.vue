<template>
  <div class="cards__wrapper">
    <div class="card__wrapper" v-for="item in sortedSpendingsWithDate">
      <UiCard
        :id="item.id"
        :one_spending="item.one_spending"
        :reason="item.reason"
        :spending_type="item.spending_type"
        :deleteSpendingMode="deleteSpendingMode"
        @deleteCardFromGroup="deleteCardFromGroup"
      />
    </div>
  </div>
</template>

<script setup>
import UiCard from '../ui/UiCard.vue'
import { computed } from 'vue';

const props = defineProps({
  spendingsWithDates: {
    type: Array,
    required: true,
  },
  sortQuantityByDate: {
    type: String,
    required: true,
    validator: (value) => ['up', 'down', 'common'].includes(value),
  },
  deleteSpendingMode: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(['deleteCard']);

const deleteCardFromGroup = (id) => {
  emits('deleteCard', id);
};

const sortedSpendingsWithDate = computed(() => {
  if (props.sortQuantityByDate === 'up') {
    return props.spendingsWithDates.sort((a, b) => a.one_spending - b.one_spending);
  } else if (props.sortQuantityByDate === 'down') {
    return props.spendingsWithDates.sort((a, b) => b.one_spending - a.one_spending);
  } else if (props.sortQuantityByDate === 'common') {
    return props.spendingsWithDates;
  }
});
</script>

<style scoped>
.card__wrapper {
  min-width: 200px;
  margin: 10px;
}

.cards__wrapper {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(auto, 400px));
}
</style>
