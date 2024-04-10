<template>
  <label v-if="label" class="label" for="">{{ label }}</label>
  <component
    :is="multiline ? 'textarea' : 'input'"
    :class="{
      'input-full': fullWidth,
      'input-rounded': rounded,
      'invalid': invalid,
    }"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
  </component>
</template>

<script setup>
defineOptions({
  name: 'UIInput',
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  multiline: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  fullWidth: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  fontSize: {
    type: String,
    default: '20px',
  },
  textAlign: {
    type: String,
    default: 'start',
  },
  invalid: {
    type: Boolean,
  },
});

const emits = defineEmits(['update:modelValue']);
</script>

<style scoped>
input {
  font-family: 'Nunito Sans', sans-serif;
  color: var(--main-text);
  background-color: transparent;
  border: none;
  outline: 1px solid var(--main-line);
  font-size: v-bind(fontSize);
  text-align: v-bind(textAlign);
  padding: 10px;
}

input:focus {
  transition: 0.2s;
  outline: 1px solid var(--input-color);
}
.input-full {
  width: 100%;
}
.input-rounded {
  border-radius: 10px;
}
.label {
  display: block;
  width: 100%;
  margin-bottom: 5px;
}

.invalid {
  outline: 1px solid var(--red-error);
}

.invalid:focus {
  outline: 1px solid var(--red-error);
}
</style>
