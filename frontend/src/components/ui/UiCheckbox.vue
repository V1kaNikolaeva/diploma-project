<template>
  <input type="checkbox" :id="id" v-model="model" :value="props.value"/>
  <label :for="id">{{ props.checkboxText }}</label>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  checkboxText: {
    type: String,
    required: true,
  },
  checked: {
    type: [Boolean, String],
    required: true,
  },
  value: {
    type: [Boolean, String],
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(['update:checked']);

const model = computed({
  get() {
    return props.checked;
  },
  set(value) {
    emits('update:checked', value);
  },
});
</script>

<style scoped></style>
