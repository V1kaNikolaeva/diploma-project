<template>
  <UIButton :class="{'picked' : picked}" @click="pickCategory(value, picked)" :border="false">
    <p>{{ name }}</p>
    <template #right-icon>
      <UiIcon :icon="icon" />
    </template>
  </UIButton>
</template>

<script setup>
import UIButton from '../ui/UiButton.vue'
import UiIcon from '../ui/UIIcon.vue'

const props = defineProps({
    icon: {
        type: String
    },
    name: {
        type: String,
    },
    value: {
        type: String,
    },
    picked: {
        type: Boolean
    },

});
const emits = defineEmits(['sortCategory', 'update:picked']);
const pickCategory = (value) => {
    emits('sortCategory', value);
    emits('update:picked', true)
}
</script>
<style scoped>
.picked {
    background-color: var(--card-color);
}
</style>
