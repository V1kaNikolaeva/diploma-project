<template>
  <div :class="{ modal__wrapper: isModalVisible, hidden: !isModalVisible }">
    <div class="modal__content">
      <UIButton @click="closeModalWindow(false)" :buttonType="'cancel'">
        <p>Отмена</p>
      </UIButton>
      <UIButton @click="closeModalWindow(false)" :buttonType="'add'">
        <p>Добавить</p>
      </UIButton>
    </div>
  </div>
</template>

<script>
import UIButton from "./UIButton.vue";

export default {
  name: "UIModalWindow",

  components: { UIButton },

  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["update:isModalVisible"],

  methods: {
    closeModalWindow(value) {
      this.$emit("update:isModalVisible", value);
    },
  },
};
</script>

<style scoped>
.modal__wrapper {
  z-index: 5;
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 200px;
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  overflow: auto;
}
.hidden {
  display: none;
}

.modal__content {
  position: relative;
  width: 40%;
  height: 70%;
  margin: auto;
  padding: 10px;
  background-color: var(--main-bg);
  border-radius: 10px;
}

/* .close__modal {
    width: 35px;
    height: 35px;
    background-image: url(../assets/icons/icons8-close.svg)
} */
</style>
