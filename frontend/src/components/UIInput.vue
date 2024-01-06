<template>
  <component 
    :is="multiline ? 'textarea' : 'input'"
    :class="{ 
      'input-full' : fullWidth,
      'input-rounded' : rounded
    }"
    v-bind="$attrs"
  >
  </component>
</template>

<script>
export default {
  name: "UIInput",

  props: {
    multiline: {
      type: Boolean,
      default: false,
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
