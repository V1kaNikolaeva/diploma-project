<template>
  <div class="settings__contanier">
    <div class="button__wrapper">
      <UIButton @click="actions = !actions" :border="false">
        <p>Действия</p>
        <template #left-icon>
          <Transition name="icon">
            <UIIcon :icon="actions ? 'downArrow' : 'upArrow'" />
          </Transition>
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="actions" class="contanier">
          <UIButton @click="createCard(true)" :border="false">
            <p>Добавить</p>
            <template #right-icon>
              <UIIcon icon="add" />
            </template>
          </UIButton>
          <UIButton :border="false">
            <p>Удалить</p>
            <template #right-icon>
              <UIIcon icon="delete" />
            </template>
          </UIButton>
          <UIButton :border="false">
            <p>Изменить</p>
            <template #right-icon>
              <UIIcon icon="change" />
            </template>
          </UIButton>
        </div>
      </Transition>
    </div>

    <div class="button__wrapper">
      <UIButton @click="categories = !categories" :border="false">
        <p>Категории</p>
        <template #left-icon>
          <UIIcon :icon="categories ? 'downArrow' : 'upArrow'" />
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
              <UIIcon icon="cart" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('electronics')"
            :border="false"
          >
            <p>Электроника</p>
            <template #right-icon>
              <UIIcon icon="smartwatch" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('medications')"
            :border="false"
          >
            <p>Медицина</p>
            <template #right-icon>
              <UIIcon icon="pulse" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('entertainment')"
            :border="false"
          >
            <p>Развлечения</p>
            <template #right-icon>
              <UIIcon icon="acousticGuitar" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('trips')"
            :border="false"
          >
            <p>Путешествия</p>
            <template #right-icon>
              <UIIcon icon="plane" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('cloth')"
            :border="false"
          >
            <p>Одежда</p>
            <template #right-icon>
              <UIIcon icon="tShirt" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('present')"
            :border="false"
          >
            <p>Подарки</p>
            <template #right-icon>
              <UIIcon icon="gift" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('other')"
            :border="false"
          >
            <p>Другое</p>
            <template #right-icon>
              <UIIcon icon="search" />
            </template>
          </UIButton>
          <UIButton
            @click="sortCategory('all')"
            :border="false"
          >
            <p>Все</p>
            <template #right-icon>
              <UIIcon icon="search" />
            </template>
          </UIButton>
        </div>
      </Transition>
    </div>

    <div class="button__wrapper">
      <UIButton @click="sorting = !sorting" :border="false">
        <p>Сортировки</p>
        <template #left-icon>
          <UIIcon :icon="sorting ? 'downArrow' : 'upArrow'" />
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
              <UIIcon
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
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UIButton from "./UIButton.vue";
import UIIcon from "./UiIcon.vue";

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    required: true,
  },
  balance: {
    type: [Number, null],
    required: true,
  },
  sortQuantityType: {
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

const emit = defineEmits([
  "update:isModalVisible",
  "update:sortQuantityType",
  "update:sortCategoryType",
  "update:sortDateType",
]);

const createCard = (value) => {
  emit("update:isModalVisible", value);
};

let actions = ref(true);
let categories = ref(true);
let sorting = ref(true);

let sortIndex = ref(0);
let sortValue = ref(["up", "down", "common"]);

const sortQuantity = (value) => {
  if (sortIndex.value >= 2) {
    sortIndex.value = 0;
    emit("update:sortQuantityType", value);
  } else {
    sortIndex.value++;
    emit("update:sortQuantityType", value);
  }
};

const sortCategory = (value) => {
  emit("update:sortCategoryType", value);
};
</script>

<style scoped>
.settings__contanier {
  display: flex;
  flex-direction: column;
  width: 100%;
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
