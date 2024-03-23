<template>
  <button
    :class="{
      'button-icon-right': $slots['right-icon'],
      'button-icon-left': $slots['left-icon'],
      default__button: buttonType === 'default',
      select__button: buttonType === 'select',
      'cash-vault': buttonType === 'cashVault',
      'without-border': !border,
      'open-select': openSelect,
    }"
  >
    <slot />
    <div v-if="$slots['right-icon']" class="button-group__icon-right">
      <slot name="right-icon" class="icon" alt="icon" />
    </div>
    <div v-if="$slots['left-icon']" class="button-group__icon-left">
      <slot name="left-icon" class="icon" alt="icon" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    buttonType: {
      type: String,
      required: false,
      default: 'default',
      validator: (value) => ['add', 'save', 'cancel', 'default', 'show', 'cashVault', 'select'].includes(value),
    },

    border: {
      type: Boolean,
      default: true,
    },
    openSelect: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
:slotted(p) {
  margin-right: 10px;
}
.button-icon-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.button-icon-left {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
}

.button-group__icon-left {
  margin-right: 10px;
}

.default__button,
.select__button {
  border: none;
  background: none;
  height: 40px;
  font-size: 15px;
  color: var(--main-text);
  padding: 5px;
  border-radius: 10px;
}

.default__button,
.select__button {
  border: 1px solid var(--button-color);
}
.select__button {
  width: 100%;
}
.open-select {
  border-radius: 10px 10px 0px 0px;
}
.cash-vault {
  position: fixed;
  border: none;
  bottom: 30px;
  right: 30px;
  width: 80px;
  height: 80px;
  padding: 5px;
  z-index: 4;
  border-radius: 60px;
  background-color: var(--card-color);
}

.without-border {
  border: none;
}
</style>
