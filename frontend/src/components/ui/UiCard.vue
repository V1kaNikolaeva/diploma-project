<template>
  <div class="cards__wrapper" >
    <div class="card__wrapper" v-for="item in sortedSpendingsWithDate">
      <div class="card">
        <p>{{ item.reason }}</p>
        <strong>{{ quantityFormatterRUB(item.one_spending) }}</strong>
        <UiIcon
          class="icon-category"
          :icon="
            item.spending_type === 'medications'
              ? 'pulse'
              : item.spending_type === 'products'
                ? 'cart'
                : item.spending_type === 'entertainment'
                  ? 'acousticGuitar'
                  : item.spending_type === 'electronics'
                    ? 'smartwatch'
                    : item.spending_type === 'trips'
                      ? 'plane'
                      : item.spending_type === 'cloth'
                        ? 'tShirt'
                        : item.spending_type === 'present'
                          ? 'gift'
                          : item.spending_type === 'other'
                            ? 'search'
                            : null
          "
        >
        </UiIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import UiIcon from './UIIcon.vue';
import { quantityFormatterRUB } from '../../utils/quantityFormatters';
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
  }
});

const sortedSpendingsWithDate = computed(() => {
  if (props.sortQuantityByDate === 'up') {
    return props.spendingsWithDates.sort((a, b) => a.one_spending - b.one_spending);
  } else if (props.sortQuantityByDate === 'down') {
    return props.spendingsWithDates.sort((a, b) => b.one_spending - a.one_spending);
  } else if (props.sortQuantityByDate === 'common') {
    return props.spendingsWithDates;
  }
})
</script>

<style scoped>
.card__wrapper {
  min-width: 200px;
  margin: 10px;
}
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid var(--main-line);
}

p:first-child {
  text-align: start;
  color: var(--main-text);
  width: 60%;
}

strong:nth-child(2) {
  text-align: end;
  color: var(--main-text);
  font-size: 18px;
  width: auto;
}

.icon-category:nth-child(3) {
  text-align: end;
  width: 10%;
}

.icon-category {
  height: 20px;
  width: 20px;
  margin-left: 5px;
}

.cards__wrapper {
  display: grid;
  justify-content: center;
  grid-template-columns:
    minmax(auto, 400px)
    minmax(auto, 400px)
    minmax(auto, 400px);
}
</style>
