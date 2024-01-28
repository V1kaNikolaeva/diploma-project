<template>
  <div class="card__wrapper">
    <div class="card">
      <strong>{{ card.reason }}</strong>
      <strong>{{ card.quantity }}{{ card.currency }}</strong>
      <UIIcon 
        class="icon-category" 
        :icon="
          category === 'medications' ? 'medkit' : 
          category === 'products' ? 'cart' :
          category === 'entertainment' ? 'gamepad' :
          category === 'electronics' ? 'laptop' :
          category === 'trips' ? 'plane' :
          category === 'cloth' ? 't-shirt' :
          category === 'present' ? 'gift' :
          category === 'other' ? 'other' :
          null
        ">
      </UIIcon>
    </div>
  </div>
</template>

<script setup>
//Категории карточки:
//-Медицина 
//-Продукты (корзина)
//-Развлечения
//-Электроника
//-Путешествия
//-Одежда
//-Подарки
import UIIcon from './UIIcon.vue';

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  category: {
    type: String
  }
});
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
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--card-color);
}

strong:first-child {
  text-align: start;
  width: 60%;
}

strong:nth-child(2) {
  text-align: end;
  font-size: 18px;
  width: 30%;
}

.icon-category:nth-child(3) {
  text-align: end;
  width: 10%;
}

.icon-category {
  margin-left: 5px;
}
</style>
