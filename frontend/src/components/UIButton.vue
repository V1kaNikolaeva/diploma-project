<template>
  <button :class="{ 
    'add_button' : buttonType === 'add',
    'cancel__button' : buttonType === 'cancel',
    'save__button' : buttonType === 'save',
   }">
    <slot />
   </button>
</template>

<script>
export default {
  name: "UIButton",
  props: {
    buttonType: {
      type: String,
      required: true,
      validator: (value) => ["add", "save", "cancel"].includes(value),
    },
    icon: {
      type: String, //TODO ICONS LIBARY
    }
  },
};
</script>

<style scoped>
:slotted(p) {
  color: var(--main-text);
}
.add_button,
.save__button,
.cancel__button {
  border-radius: 10px;
}
.add_button {
  border: 1px solid var(--light-green);
}
.save__button {
  border: 1px solid var(--light-green);
}
.cancel__button {
  border: 1px solid var(--light-red);
}
</style>
