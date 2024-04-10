<template>
  <div :class="{ modal__wrapper: props.isModalVisible, hidden: !props.isModalVisible }">

    <div v-on-click-outside="outsideClose" class="modal__content">
      <slot/>
    </div>
  </div>
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
  isModalVisible: {
      type: Boolean,
      required: true,
    },
})
const emits = defineEmits(
  ['update:isModalVisible']
)


const outsideClose = () => {
  emits('update:isModalVisible', false)
}

</script>

<style scoped>
.modal__wrapper {
  z-index: 5;
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 200px;
  padding-left: 20px;
  padding-right: 20px;
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
  max-width: 700px;
  max-height: 400px;
  margin: auto;
  padding: 40px;
  background-color: var(--main-bg);
  border-radius: 10px;
}

/* .close__modal {
    width: 35px;
    height: 35px;
    background-image: url(../assets/icons/icons8-close.svg)
} */
</style>./UiModalWindow.vue./UiButton.vue
