<template>
  <div v-if="spendingsSortedWithDates.length" v-for="item in spendingsSortedWithDates">
    <div class="line">
      <p class="date-name">{{ item.date }}</p>
    </div>
    <UICard :sortQuantityByDate="props.sortQuantityByDate" :spendingsWithDates="item.cards" />
  </div>
  <div v-else-if="!spendingsSortedWithDates.length" class="no-spendings-contanier">
      <div class="no-spendings">
        <strong><p class="p-no-spendings">Тут ничего нет</p></strong>
        <p class="p-no-spendings">Создайте трату</p>
      </div>
    </div>
</template>

<script setup>
import UICard from '../ui/UiCard.vue';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  spendings: {
    type: Array,
    required: true,
  },
  sortQuantityType: {
    type: String,
    required: true,
    validator: (value) => ['up', 'down', 'common'].includes(value),
  },
  sortCategoryType: {
    type: String,
    required: true,
    default: 'all',
    // validator: (value) => ['up', 'down', 'common'].includes(value)
  },
  sortQuantityByDate: {
    type: String,
    required: true,
    validator: (value) => ['up', 'down', 'common'].includes(value),
  }
});

let localSpendings = ref([...props.spendings]);

watch(props.spendings, () => {
  localSpendings.value = [...props.spendings];
});

const numToMounth = {
  '01': 'Январь',
  '02': 'Февраль',
  '03': 'Март',
  '04': 'Апрель',
  '05': 'Май',
  '06': 'Июнь',
  '07': 'Июль',
  '08': 'Август',
  '09': 'Сентябрь',
  '10': 'Октябрь',
  '11': 'Ноябрь',
  '12': 'Декабрь',
};

const spendingsSortedWithDates = computed(() => {
  let allDates = [];
  let differentDates = [];
  for (let i = 0; i < sortedCards.value.length; i++) {
    let year = sortedCards.value[i].created_at_formated.substring(6);
    let mounth;
    for (let j in numToMounth) {
      if (j === sortedCards.value[i].created_at_formated.substring(3, 5)) {
        mounth = numToMounth[j];
        allDates.push(`${mounth} ${year} года`);
      }
    }
    if (allDates[i - 1] !== allDates[i]) {
      //С какого индекса вставлять дату и какую
      differentDates.push({ date: allDates[i], newLineIndex: i, cards: [] });
      differentDates.at(-1).cards.push(sortedCards.value[i]);
    } else {
      differentDates.at(-1).cards.push(sortedCards.value[i]);
    }
  }
  return differentDates;
});

const sortedCards = computed(() => {
  let currentSort = localSpendings.value.filter((item) =>
    props.sortCategoryType !== 'all' ? item.spending_type === props.sortCategoryType : localSpendings.value,
  );

  if (props.sortQuantityType === 'up') {
    return currentSort.sort((a, b) => a.one_spending - b.one_spending);
  } else if (props.sortQuantityType === 'down') {
    return currentSort.sort((a, b) => b.one_spending - a.one_spending);
  } else if (props.sortQuantityType === 'common') {
    return currentSort;
  }
});
</script>

<style scoped>
.line {
  border-bottom: 1px solid var(--card-color);
  width: 100%;
  margin: 20px 0px 20px 0px;
}
.date-name {
  color: var(--light-orange);
}
</style>
