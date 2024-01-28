<template>
  <div class="settings__contanier">
    <div class="button__wrapper">
      <UIButton @click="createCard(true)" :buttonType="'add'">
        <p>Добавить</p>
        <template #right-icon>
          <UIIcon icon="add" />
        </template>
      </UIButton>
    </div>

    <div class="button__wrapper">
      <UIButton :buttonType="'show'">
        <p>Расходы</p>
        <template #right-icon>
          <UIIcon icon="arrow" />
        </template>
      </UIButton>
    </div>

    <div class="button__wrapper">
      <UIButton :buttonType="'show'">
        <p>Доходы</p>
        <template #right-icon>
          <UIIcon icon="arrow" />
        </template>
      </UIButton>
    </div>

    <div class="button__wrapper">
      <UIButton :buttonType="'default'">
        <p>По дате</p>
        <template #right-icon>
          <UIIcon icon="sort" />
        </template>
      </UIButton>
    </div>

    <div class="button__wrapper">
      <UIButton :buttonType="'default'">
        <p>По сумме</p>
        <template #right-icon>
          <UIIcon icon="sort" />
        </template>
      </UIButton>
    </div>
  </div>
</template>

<script>
import UIButton from "./UIButton.vue";
import UIIcon from "./UIIcon.vue";

export default {
  name: "SettingsBar",

  components: { UIButton, UIIcon },
  
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
    balance: {
      type: [Number, null],
      required: true,
    }
  },

  emits: ["update:isModalVisible"],

  methods: {
    createCard(value) {
      this.$emit("update:isModalVisible", value);
    },
  },
};
</script>

<style scoped>
.settings__contanier {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.button__wrapper {
  margin: 10px;
}
</style>
