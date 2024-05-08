<template>
  <div class="checkbox__wrapper">
    <input class="input-checkbox" type="checkbox" :id="id" v-model="model" :value="props.value"/>
    <label class="checkbox-label" :for="id">{{ props.checkboxText }}</label>
  </div>
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

<style scoped>
.checkbox__wrapper {
  display: flex;
  flex-direction: row;
  margin: 10px 0px 10px 0px;
}
.input-checkbox {
  width: 20px;
  height: 20px;
}
.checkbox-label {
  margin-left: 10px;
}
</style>
