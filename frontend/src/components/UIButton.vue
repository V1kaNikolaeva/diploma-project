<template>
  <button 
    :class="{ 
    'button-icon-right' : $slots['right-icon'],
    'button-icon-left' : $slots['left-icon'],
    'add__button' : buttonType === 'add' && border,
    'cancel__button' : buttonType === 'cancel' && border,
    'save__button' : buttonType === 'save' && border,
    'default__button' : buttonType === 'default' && border,
    'show__button' : buttonType === 'show' && border,
    'cash-vault' : buttonType === 'cashVault' && border,
    'without-border' : !border,
   }">
    <slot />
    <div v-if="$slots['right-icon']" class="button-group__icon-right">
      <slot name="right-icon" class="icon" alt="icon"/>

    </div>
    <div v-if="$slots['left-icon']" class="button-group__icon-left">
      <slot name="left-icon" class="icon" alt="icon"/>

    </div>
   </button>
</template>

<script>
export default {
  name: "UIButton",
  props: {
    buttonType: {
      type: String,
      required: false,
      default: "default",
      validator: (value) => ["add", "save", "cancel", "default", "show", "cashVault"].includes(value),
    },
    border: {
      type: Boolean,
      default: true,
    }
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

.add__button,
.cancel__button,
.default__button,
.show__button,
.save__button,
.without-border {
  border: none;    
  background: none;
  height: 40px;
  font-size: 15px;
  color: var(--main-text);
  padding: 5px;
  border-radius: 10px;
}
.add__button {
  border: 1px solid var(--light-green);
}
.save__button {
  border: 1px solid var(--light-green);
}
.cancel__button {
  border: 1px solid var(--light-red);
}
.default__button {
  border: 1px solid var(--button-color);
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
  background-color:  var(--card-color);
}

.without-border {
  border: none;
}
</style>
