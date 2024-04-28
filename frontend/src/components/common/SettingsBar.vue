<template>
  <div class="settings__contanier">
    <div class="button__wrapper">
      <UIButton @click="actions = !actions" :border="false">
        <p>Действия</p>
        <template #left-icon>
          <Transition name="icon">
            <UiIcon :icon="actions ? 'downArrow' : 'upArrow'" />
          </Transition>
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="actions" class="contanier">
          <UIButton @click="createCard(true)" :border="false">
            <p>Добавить</p>
            <template #right-icon>
              <UiIcon icon="add" />
            </template>
          </UIButton>
          <UIButton :border="false">
            <p>Удалить</p>
            <template #right-icon>
              <UiIcon icon="delete" />
            </template>
          </UIButton>
          <UIButton :border="false">
            <p>Изменить</p>
            <template #right-icon>
              <UiIcon icon="change" />
            </template>
          </UIButton>
        </div>
      </Transition>
    </div>

    <div class="button__wrapper">
      <UIButton @click="categories = !categories" :border="false">
        <p>Категории</p>
        <template #left-icon>
          <UiIcon :icon="categories ? 'downArrow' : 'upArrow'" />
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="categories" class="contanier">
          <UIButton
            @click="sortCategory('products')"
            :border="false"
          >
            <p>Продукты</p>
            <template #right-icon>
              <UiIcon icon="cart" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('electronics')"
            :border="false"
          >
            <p>Электроника</p>
            <template #right-icon>
              <UiIcon icon="smartwatch" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('medications')"
            :border="false"
          >
            <p>Медицина</p>
            <template #right-icon>
              <UiIcon icon="pulse" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('entertainment')"
            :border="false"
          >
            <p>Развлечения</p>
            <template #right-icon>
              <UiIcon icon="acousticGuitar" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('trips')"
            :border="false"
          >
            <p>Путешествия</p>
            <template #right-icon>
              <UiIcon icon="plane" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('cloth')"
            :border="false"
          >
            <p>Одежда</p>
            <template #right-icon>
              <UiIcon icon="tShirt" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('present')"
            :border="false"
          >
            <p>Подарки</p>
            <template #right-icon>
              <UiIcon icon="gift" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('other')"
            :border="false"
          >
            <p>Другое</p>
            <template #right-icon>
              <UiIcon icon="search" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('all')"
            :border="false"
          >
            <p>Все</p>
            <template #right-icon>
              <UiIcon icon="search" />
            </template>
          </UIButton>
        </div>
      </Transition>
    </div>

    <div class="button__wrapper">
      <UIButton @click="sorting = !sorting" :border="false">
        <p>Сортировки</p>
        <template #left-icon>
          <UiIcon :icon="sorting ? 'downArrow' : 'upArrow'" />
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="sorting" class="contanier">
          <UIButton
            @click="sortQuantity(sortValue[sortIndex])"
            :border="false"
          >
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
            @click="sortQuantityDate(sortValueByDate[sortIndexByDate])"
            :border="false"
          >
            <p>По сумме в месяцах</p>
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
import { ref } from "vue";
import UIButton from "../ui/UiButton.vue";
import UiIcon from "../ui/UIIcon.vue";

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    required: true,
  },
  sortQuantityType: {
    type: String,
    required: true,
    default: "commmon",
  },
  sortQuantityByDate: {
    type: String,
    required: true,
    default: "commmon",
  },
  sortCategoryType: {
    type: String,
    required: true,
    default: "all",
    // validator: (value) => ['up', 'down', 'common'].includes(value)
  },
});

const emits = defineEmits([
  "update:isModalVisible",
  "update:modalFormType",
  "update:sortQuantityType",
  "update:sortCategoryType",
  "update:sortQuantityByDate",
]);

const createCard = (value) => {
  emits("update:isModalVisible", value);
  emits("update:modalFormType", 'createCard');
};

let actions = ref(true);
let categories = ref(true);
let sorting = ref(true);

let sortIndex = ref(0);
let sortValue = ref(["up", "down", "common"]);
const sortQuantity = (value) => {
  if (sortIndex.value >= 2) {
    sortIndex.value = 0;
    emits("update:sortQuantityType", value);
  } else {
    sortIndex.value++;
    emits("update:sortQuantityType", value);
  }
};

let sortIndexByDate = ref(0);
let sortValueByDate = ref(["up", "down", "common"]);
const sortQuantityDate = (value) => {
  if (sortIndexByDate.value >= 2) {
    sortIndexByDate.value = 0;
    emits("update:sortQuantityByDate", value);
  } else {
    sortIndexByDate.value++;
    emits("update:sortQuantityByDate", value);
  }
};

const sortCategory = (value) => {
  emits("update:sortCategoryType", value);
};
</script>

<style scoped>
.settings__contanier {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  padding: 0px 30px 0px 30px;
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
</style>
