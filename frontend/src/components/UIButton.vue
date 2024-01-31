<template>
  <button :class="{ 
    'button-icon' : $slots['right-icon'],
    'add__button' : buttonType === 'add',
    'cancel__button' : buttonType === 'cancel',
    'save__button' : buttonType === 'save',
    'default__button' : buttonType === 'default',
    'show__button' : buttonType === 'show',
    'cash-vault' : buttonType === 'cashVault',
   }">
    <slot />
    <div v-if="$slots['right-icon']" class="button-group__icon">
      <slot name="right-icon" class="icon" alt="icon"/>

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
  },
};
</script>

<style scoped>
:slotted(p) {
  color: var(--main-text);
}
.button-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.add__button,
.cancel__button,
.default__button,
.show__button,
.save__button {
  border: none;    
  background: none;
  height: 40px;
  width: 110px;
  font-size: 15px;
  color: var(--main-text);
  padding: 5px;
  border-radius: 10px;
}
.add__button {
  border: 2px solid var(--light-green);
}
.save__button {
  border: 2px solid var(--light-green);
}
.cancel__button {
  border: 2px solid var(--light-red);
}
.default__button {
  border: 2px solid var(--button-color);
}
.show__button {
  border: 2px solid var(--light-orange);
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
</style>
