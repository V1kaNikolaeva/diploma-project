<template>
  <div class="settings__contanier">

    <div class="button__wrapper">
      <UIButton @click="actions = !actions" buttonType="show">
        <p>Действия</p>
        <template #left-icon>
          <Transition name="icon">
            <UIIcon 
              :icon="actions ? 'downArrow' : 'upArrow'"
            />
          </Transition>
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="actions" class="contanier">
            <UIButton @click="createCard(true)" :border="false" buttonType="add">
              <p>Добавить</p>
              <template #right-icon>
                <UIIcon icon="add" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Удалить</p>
              <template #right-icon>
                <UIIcon icon="delete" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Изменить</p>
              <template #right-icon>
                <UIIcon icon="change" />
              </template>
            </UIButton>
        </div>
      </Transition>
    </div>

    <div class="button__wrapper">
      <UIButton @click="categories = !categories" buttonType="show">
        <p>Категории</p>
        <template #left-icon>
          <UIIcon 
            :icon="categories ? 'downArrow' : 'upArrow'"
          />
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="categories" class="contanier">
            <UIButton :border="false" buttonType="add">
              <p>Продукты</p>
              <template #right-icon>
                <UIIcon icon="cart" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Электроника</p>
              <template #right-icon>
                <UIIcon icon="smartwatch" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Медицина</p>
              <template #right-icon>
                <UIIcon icon="pulse" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Развлечения</p>
              <template #right-icon>
                <UIIcon icon="acousticGuitar" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Путешествия</p>
              <template #right-icon>
                <UIIcon icon="plane" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Одежда</p>
              <template #right-icon>
                <UIIcon icon="tShirt" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Подарки</p>
              <template #right-icon>
                <UIIcon icon="gift" />
              </template>
            </UIButton>
            <UIButton :border="false" buttonType="add">
              <p>Другое</p>
              <template #right-icon>
                <UIIcon icon="search" />
              </template>
            </UIButton>
        </div>
      </Transition>
    </div>

    <div class="button__wrapper">
      <UIButton @click="sorting = !sorting" buttonType="show">
        <p>Сортировки</p>
        <template #left-icon>
          <UIIcon 
            :icon="sorting ? 'downArrow' : 'upArrow'" 
          />
        </template>
      </UIButton>
      <Transition name="list">
        <div v-show="sorting" class="contanier">
            <UIButton :border="false" :buttonType="'default'">
              <p>По дате</p>
              <template #right-icon>
                <UIIcon icon="sort" />
              </template>
            </UIButton>
            <UIButton :border="false" :buttonType="'default'">
              <p>По сумме</p>
              <template #right-icon>
                <UIIcon icon="sort" />
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
import UIIcon from "./UIIcon.vue";

const props = defineProps({
  isModalVisible: {
      type: Boolean,
      required: true,
    },
    balance: {
      type: [Number, null],
      required: true,
    }
})

const emits = defineEmits(["update:isModalVisible"])

const createCard = (value) => {
  emits("update:isModalVisible", value);
}

let actions = ref(true);
let categories = ref(true);
let sorting = ref(true);


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

.list-enter-from, .list-leave-to {
  opacity: 0;
}

.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s ease-in-out;
}

.icon-enter-from, .icon-leave-to {
  transform: rotate(90deg);
}
</style>
