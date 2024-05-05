<template>
  <div
    :class="{
      'card': lightCard === null,
      'card active': lightCard === id,
    }"
    @click="deleteSpendingMode || spendingMode === 'change' ? cardFromUi(id, {reason: reason, spending_type: spending_type, one_spending: one_spending, id: id}) : null"
    @mouseover="changeColor(id)"
    @mouseleave="originalColor"
  >
    <p>{{ reason }}</p>
    <strong>{{ quantityFormatterRUB(one_spending) }}</strong>
    <UiIcon
      class="icon-category"
      :icon="
        spending_type === 'medications'
          ? 'pulse'
          : spending_type === 'products'
            ? 'cart'
            : spending_type === 'entertainment'
              ? 'acousticGuitar'
              : spending_type === 'electronics'
                ? 'smartwatch'
                : spending_type === 'trips'
                  ? 'plane'
                  : spending_type === 'cloth'
                    ? 'tShirt'
                    : spending_type === 'present'
                      ? 'gift'
                      : spending_type === 'other'
                        ? 'search'
                        : null
      "
    >
    </UiIcon>
  </div>
</template>

<script setup>
import { quantityFormatterRUB } from '../../utils/quantityFormatters';
import UiIcon from './UIIcon.vue';
import { ref, computed } from 'vue';


const props = defineProps({
  id: {},
  reason: {},
  spending_type: {},
  one_spending: {},
  deleteSpendingMode: {},
  spendingMode: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(['cardFromGroup']);

const cardFromUi = (id, updatedData) => {
  lightCard.value = null;
  emits('cardFromGroup', id, updatedData);
};

let lightCard = ref(null)
const changeColor = (id) => {
  if (props.deleteSpendingMode || props.spendingMode === 'change') {
    lightCard.value = id
  }
}

const originalColor = () => {
  lightCard.value = null
}

const cursor = computed(() => {
  return props.deleteSpendingMode || props.spendingMode === 'change' ? 'pointer' : 'auto';
});
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid var(--main-line);
  cursor: v-bind(cursor);
}
.active {
  border: 1px solid var(--light-orange);
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
</style>
