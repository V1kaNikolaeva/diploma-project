<template>
  <component 
    :is="multiline ? 'textarea' : 'input'"
    :class="{ 
      'input-full' : fullWidth,
      'input-rounded' : rounded
    }"
    v-bind="$attrs"
    :value="modelValue"
    @[updateEvent]="$emit('update:modelValue', $event.target.value)"
  >
  </component>
</template>

<script>
export default {
  name: "UIInput",

  inheritAttrs: false,
  
  props: {
    modelValue: {
      type: String,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    modelModifiers: {
      default: () => ({
        lazy: false,
      }),
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: Boolean,
      default: true,
    }
  },
  emits: ['update:modelValue'],

  computed: {
    updateEvent() {
      return this.modelModifiers.lazy ? 'change' : 'input';
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
.input-full {
  width: 100%;
}

.input-rounded {
  border-radius: 10px;
}
</style>
