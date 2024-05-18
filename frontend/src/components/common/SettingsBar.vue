<template>
  <div class="settings__contanier" v-on-click-outside="outside">
    <div class="button__wrapper">
      <UIButton class="setting-button" @click="changeVisibility(0)" :border="false">
        <p v-if="userWidth > 768">Действия</p>
        <template v-if="userWidth > 768" #left-icon>
          <Transition name="icon">
            <UiIcon :icon="list[0].value ? 'downArrow' : 'upArrow'" />
          </Transition>
        </template>
        <template #right-icon v-if="userWidth < 768">
          <UiIcon icon="actions"></UiIcon>
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="list[0].value" class="contanier list-active-actions">
          <UIButton class="actions-item" @click="createCard(true)" :border="false">
            <p>Добавить</p>
            <template #right-icon>
              <UiIcon icon="add" />
            </template>
          </UIButton>
          <UIButton class="active-delete actions-item" @click="deleteSpendingActivateOrNot" :border="false">
            <p>Удалить</p>
            <template #right-icon>
              <UiIcon icon="delete" />
            </template>
          </UIButton>
          <UIButton class="active-change actions-item" :border="false" @click="changeSpending">
            <p>Изменить</p>
            <template #right-icon>
              <UiIcon icon="change" />
            </template>
          </UIButton>
        </div>
      </Transition>
    </div>

    <div class="button__wrapper">
      <UIButton class="setting-button" @click="changeVisibility(1)" :border="false">
        <p v-if="userWidth > 768">Категории</p>
        <template v-if="userWidth > 768" #left-icon>
          <UiIcon :icon="list[1].value ? 'downArrow' : 'upArrow'" />
        </template>
        <template #right-icon v-if="userWidth < 768">
          <UiIcon icon="categories"></UiIcon>
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="list[1].value" class="contanier list-active-categories">
          <CategoryItem
            v-for="category in categories"
            :icon="category.icon"
            :name="category.name"
            :value="category.value"
            v-model:picked="category.picked"
            @sortCategory="sortCategory"
          />

          <!-- <UIButton class="category-item" @click="sortCategory('products')" :border="false">
            <p>Продукты</p>
            <template #right-icon>
              <UiIcon icon="cart" />
            </template>
          </UIButton>
          <UIButton class="category-item" @click="sortCategory('electronics')" :border="false">
            <p>Электроника</p>
            <template #right-icon>
              <UiIcon icon="smartwatch" />
            </template>
          </UIButton>
          <UIButton class="category-item" @click="sortCategory('medications')" :border="false">
            <p>Медицина</p>
            <template #right-icon>
              <UiIcon icon="pulse" />
            </template>
          </UIButton>
          <UIButton class="category-item" @click="sortCategory('entertainment')" :border="false">
            <p>Развлечения</p>
            <template #right-icon>
              <UiIcon icon="acousticGuitar" />
            </template>
          </UIButton>
          <UIButton class="category-item" @click="sortCategory('trips')" :border="false">
            <p>Путешествия</p>
            <template #right-icon>
              <UiIcon icon="plane" />
            </template>
          </UIButton>
          <UIButton class="category-item" @click="sortCategory('cloth')" :border="false">
            <p>Одежда</p>
            <template #right-icon>
              <UiIcon icon="tShirt" />
            </template>
          </UIButton>
          <UIButton class="category-item" @click="sortCategory('present')" :border="false">
            <p>Подарки</p>
            <template #right-icon>
              <UiIcon icon="gift" />
            </template>
          </UIButton>
          <UIButton class="category-item" @click="sortCategory('other')" :border="false">
            <p>Другое</p>
            <template #right-icon>
              <UiIcon icon="search" />
            </template>
          </UIButton>
          <UIButton class="category-item" @click="sortCategory('all')" :border="false">
            <p>Все</p>
            <template #right-icon>
              <UiIcon icon="search" />
            </template>
          </UIButton> -->
        </div>
      </Transition>
    </div>

    <div class="button__wrapper">
      <UIButton class="setting-button" @click="changeVisibility(2)" :border="false">
        <p v-if="userWidth > 768">Сортировки</p>
        <template v-if="userWidth > 768" #left-icon>
          <UiIcon :icon="list[2].value ? 'downArrow' : 'upArrow'" />
        </template>
        <template #right-icon v-if="userWidth < 768">
          <UiIcon icon="sorting"></UiIcon>
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="list[2].value" class="contanier list-active-sorting">
          <UIButton class="sort-item" @click="sortQuantity(sortValue[sortIndex])" :border="false">
            <p>По сумме</p>
            <template #right-icon>
              <UiIcon
                :icon="
                  sortQuantityType === 'up'
                    ? 'sortUp'
                    : sortQuantityType === 'down'
                      ? 'sortDown'
                      : sortQuantityType === 'common'
                        ? 'sortCommon'
                        : null
                "
              />
            </template>
          </UIButton>
          <UIButton
            class="sort-item"
            v-if="props.oneMounth === false"
            @click="sortQuantityDate(sortValueByDate[sortIndexByDate])"
            :border="false"
          >
            <p>По сумме в мес.</p>
            <template #right-icon>
              <UiIcon
                :icon="
                  sortQuantityByDate === 'up'
                    ? 'sortUp'
                    : sortQuantityByDate === 'down'
                      ? 'sortDown'
                      : sortQuantityByDate === 'common'
                        ? 'sortCommon'
                        : null
                "
              />
            </template>
          </UIButton>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { useUserWidthObserver } from '@/composables/useUserWidthObserver';
import UIButton from '../ui/UiButton.vue';
import UiIcon from '../ui/UIIcon.vue';
import CategoryItem from '../common/CategoryItem.vue'

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    required: true,
  },
  oneMounth: {
    type: Boolean,
    required: true,
  },
  sortQuantityType: {
    type: String,
    required: true,
    default: 'commmon',
  },
  sortQuantityByDate: {
    type: String,
    required: true,
    default: 'commmon',
  },
  sortCategoryType: {
    type: String,
    required: true,
    default: 'all',
    // validator: (value) => ['up', 'down', 'common'].includes(value)
  },
  deleteSpendingMode: {
    type: Boolean,
    required: true,
  },
  spendingMode: {
    type: String,
    required: true,
  },
});

const emits = defineEmits([
  'update:isModalVisible',
  'update:modalFormType',
  'update:sortQuantityType',
  'update:sortCategoryType',
  'update:sortQuantityByDate',
  'update:deleteSpendingMode',
  'update:spendingMode',
]);

const categories = ref([
  {icon: 'pulse', name: 'Здоровье', value: 'medications', picked: false},
  {icon: 'cart', name: 'Продукты', value: 'products', picked: false},
  {icon: 'acousticGuitar', name: 'Развлечения', value: 'entertainment', picked: false},
  {icon: 'smartwatch', name: 'Электроника', value: 'electronics', picked: false},
  {icon: 'plane', name: 'Путешествия', value: 'trips', picked: false},
  {icon: 'tShirt', name: 'Одежда', value: 'cloth', picked: false},
  {icon: 'gift', name: 'Подарки', value: 'present', picked: false},
  {icon: 'search', name: 'Другое', value: 'other', picked: false},
  {icon: 'search', name: 'Все', value: 'all', picked: true},
])

const createCard = (value) => {
  emits('update:isModalVisible', value);
  emits('update:modalFormType', 'createCard');
};

const deleteSpendingActivateOrNot = () => {
  emits('update:deleteSpendingMode', !props.deleteSpendingMode);
  if (props.spendingMode === 'change' || props.spendingMode === '') {
    emits('update:spendingMode', 'delete');
  } else {
    emits('update:spendingMode', '');
  }
};
const changeSpending = () => {
  if (props.spendingMode === 'delete' || props.spendingMode === '') {
    emits('update:deleteSpendingMode', false);
    emits('update:spendingMode', 'change');
  } else {
    emits('update:spendingMode', '');
  }
};

const list = ref([
  { name: 'actions', value: false },
  { name: 'categories', value: false },
  { name: 'sorting', value: false },
]);

const { userWidth } = useUserWidthObserver()

watchEffect(() => {
  if (userWidth.value > 768) {
    list.value = [
      { name: 'actions', value: true },
      { name: 'categories', value: true },
      { name: 'sorting', value: true },
    ];
  } else {
    list.value = [
      { name: 'actions', value: false },
      { name: 'categories', value: false },
      { name: 'sorting', value: false },
    ];
  }
})
const changeVisibility = (index) => {
  if (userWidth.value < 768) {
    for (let i in list.value) {
      if (i == index) {
        list.value[i].value = !list.value[i].value;
      } else {
        list.value[i].value = false;
      }
    }
  } else {
    list.value[index].value = !list.value[index].value;
  }
};

const outside = () => {
  if (userWidth.value < 768) {
    for (let i in list.value) {
      list.value[i].value = false;
    }
  }
}

let sortIndex = ref(0);
let sortValue = ref(['up', 'down', 'common']);
const sortQuantity = (value) => {
  if (sortIndex.value >= 2) {
    sortIndex.value = 0;
    emits('update:sortQuantityType', value);
  } else {
    sortIndex.value++;
    emits('update:sortQuantityType', value);
  }
};

let sortIndexByDate = ref(0);
let sortValueByDate = ref(['up', 'down', 'common']);
const sortQuantityDate = (value) => {
  if (sortIndexByDate.value >= 2) {
    sortIndexByDate.value = 0;
    emits('update:sortQuantityByDate', value);
  } else {
    sortIndexByDate.value++;
    emits('update:sortQuantityByDate', value);
  }
};

const sortCategory = (value) => {
  categories.value.forEach((category) => {
    if (category.value !== value) {
      category.picked = false
    } 
  })
  emits('update:sortCategoryType', value);
};

const activeColorDelete = computed(() => {
  return props.deleteSpendingMode ? '#313131' : '#191919';
});
const activeColorChange = computed(() => {
  return props.spendingMode === 'change' ? '#313131' : '#191919';
});
</script>

<style scoped>
.active-delete {
  background-color: v-bind(activeColorDelete);
}

.active-change {
  background-color: v-bind(activeColorChange);
}

.settings__contanier {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  padding: 80px 30px 0px 30px;
}

.contanier {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

.button__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  margin: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s ease-in-out;
}

.icon-enter-from,
.icon-leave-to {
  transform: rotate(90deg);
}

@media (max-width: 768px) {
  /* .settings__wrapper {
  } */
  .settings__contanier {
    flex-direction: row-reverse;
    position: relative;
    align-items: start;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 0;
  }
  .contanier {
    align-items: normal;
    margin-top: 10px;
    padding: 5px;
    background-color: var(--main-bg);
    border: 1px solid var(--main-line);
    border-top: none;
  }

  /* .actions-item {

  }
  .category-item {

  }
  .sort-item {

  } */
  .button__wrapper {
    width: auto;
    margin: 10px 0px 10px 0px;
  }
  .setting-button {
    padding-bottom: 26px;
  }
}
</style>
