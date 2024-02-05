<template>
  <label v-if="label" class="label" for="">{{ label }}</label>
  <component 
    :is="multiline ? 'textarea' : 'input'"
    :class="{ 
      'input-full' : fullWidth,
      'input-rounded' : rounded
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
})

const props = defineProps({
  modelValue: {
    type: String,
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
  }
})

const emits = defineEmits(['update:modelValue'])

</script>

<style scoped>
.input-full {
  width: 100%;
}
.input-rounded {
  border-radius: 10px;
}
.label {
    width: 100%;
    margin-bottom: 5px;
}
</style>
