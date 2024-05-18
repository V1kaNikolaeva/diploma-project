<template>
  <div v-if="spendingsSortedWithDates.length" v-for="item in spendingsSortedWithDates">
    <div class="line">
      <p class="date-name">{{ item.date }}</p>
    </div>
    <CardGroup
      :deleteSpendingMode="deleteSpendingMode"
      :sortQuantityByDate="props.sortQuantityByDate"
      :spendingsWithDates="item.cards"
      :oneMounth="oneMounth"
      :spendingMode="props.spendingMode"
      @deleteCard="deleteCard"
      @changeCard="changeCard"
    />
  </div>
  <div v-else-if="!spendingsSortedWithDates.length" class="no-spendings-contanier-sort">
    <div class="no-spendings">
      <strong><p class="p-no-spendings">Тут ничего нет</p></strong>
    </div>
  </div>
</template>

<script setup>
import CardGroup from '../common/CardGroup.vue';
import { computed, ref, watch, watchEffect } from 'vue';
import { useModalWindowStore } from '@/stores/modalWindow';

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
    validator: (value) => ['medications', 'products', 'entertainment', 'electronics', 'trips', 'cloth', 'present', 'other', 'all'].includes(value)
  },
  sortQuantityByDate: {
    type: String,
    required: true,
    validator: (value) => ['up', 'down', 'common'].includes(value),
  },
  oneMounth: {
    type: Boolean,
    required: true,
  },
  deleteSpendingMode: {
    type: Boolean,
    required: true,
  },
  deleteSpendingId: {},
  modalFormType: {
    type: String
  },
  isModalVisible: {	
      type: Boolean,		
      required: true,		
    },	
    spendingMode: {
    type: String,
    required: true,
  },
  updatedData: {},
  deletedData: {},
});

const emits = defineEmits([
  'update:modalFormType', 
  'update:isModalVisible', 
  'update:deleteSpendingMode', 
  'update:deleteSpendingId', 
  'update:oneMounth', 
  'deleteSpending',
  'update:updatedData',
  'update:deletedData',
]);
const modalWindowStore = useModalWindowStore()


const deleteCard = (id, deletedData) => {
	if (JSON.parse(modalWindowStore.settings.showDeleteSpending) == true) {
		emits('update:deleteSpendingId', id)
		emits('deleteSpending')
	} else {
    emits('update:deletedData', deletedData)
  	emits('update:deleteSpendingId', id)	
    emits('update:isModalVisible', true)
  	emits('update:modalFormType', 'deleteSpending')
	}
}
const changeCard = (id, updatedData) => {
  emits('update:updatedData', updatedData)
	emits('update:isModalVisible', true)
  emits('update:modalFormType', 'updateCard')
}

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
      // Если дата такая же как прошлая то новая группа cards не генерируется
      //Просто вставляю расход в последнюю группу
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

watchEffect(() => {
  if (spendingsSortedWithDates.value.length >= 2) {
    emits('update:oneMounth', false)
  } else {
    emits('update:oneMounth', true)
  }
})

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
.no-spendings-contanier-sort {
  margin-bottom: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-spendings {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  outline: 1px solid var(--main-line);
  border-radius: 10px;
}
</style>
