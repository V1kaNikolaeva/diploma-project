<template>
  <div class="card__wrapper">
    <div class="card">
      <p>{{ card.reason }}</p>
      <strong>{{ cardQuantityRUBFormat }}{{ card.currency }}</strong>
      <UIIcon 
        class="icon-category" 
        :icon="
          category === 'medications' ? 'pulse' : 
          category === 'products' ? 'cart' :
          category === 'entertainment' ? 'acousticGuitar' :
          category === 'electronics' ? 'smartwatch' :
          category === 'trips' ? 'plane' :
          category === 'cloth' ? 'tShirt' :
          category === 'present' ? 'gift' :
          category === 'other' ? 'search' :
          null
        ">
      </UIIcon>
    </div>
  </div>
</template>

<script setup>
// Категории карточки:
// -Медицина 
// -Продукты (корзина)
// -Развлечения
// -Электроника
// -Путешествия
// -Одежда
// -Подарки
// -Другое
import { computed } from 'vue';
import UIIcon from './UiIcon.vue';

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
  },
  currencyType: {
    type: String,
  }
});

//Конвертор в рубли
const RUBCurrency = new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
});

//Конвертор в доллары
const USDCurrency = new Intl.NumberFormat('en-US', {
    currency: 'USD',
});

let { quantity } = props.card
const cardQuantityRUBFormat = computed(() => {
  return RUBCurrency.format(quantity)
}) 

const cardQuantityUSDFormat = computed(() => {
  return USDCurrency.format(quantity)
}) 
    
//currency лучше убрать  


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
  margin-left: 5px;
}
</style>