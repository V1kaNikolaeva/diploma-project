<template>
  <img class="icon" :alt="icon" :src="iconSrc" />
</template>

<script>
import Close from "../assets/icons/icon-close.svg";
import Sort from "../assets/icons/icon-sort.svg";
import Add from "../assets/icons/icon-add.svg";
import Arrow from "../assets/icons/icon-right-arrow.svg";
import Error from "../assets/icons/icon-error.svg"
import Check from "../assets/icons/icon-check.svg"
import Edit from "../assets/icons/icon-edit.svg"
import Pulse from "../assets/icons/icon-pulse.svg"
import Cart from "../assets/icons/icon-cart.svg"
import Guitar from "../assets/icons/icon-acoustic-guitar.svg"
import Smartwatch from "../assets/icons/icon-smartwatch.svg"
import Plane from "../assets/icons/icon-plane.svg"
import Tshirt from "../assets/icons/icon-t-shirt.svg"
import Gift from "../assets/icons/icon-gift.svg"
import Search from "../assets/icons/icon-search.svg"
import Bank from "../assets/icons/icon-bank.svg"

const icons = {
  "close": Close,
  "sort": Sort,
  "add": Add,
  "arrow": Arrow,
  "error": Error,
  "check": Check,
  "edit": Edit,
  "pulse": Pulse,
  "cart": Cart,
  "acoustic-guitar": Guitar,
  "smartwatch": Smartwatch,
  "plane": Plane,
  "t-shirt": Tshirt,
  "gift": Gift,
  "search": Search,
  "bank": Bank,
};

export default {
  name: "UIIcon",

  props: {
    icon: {
      type: String,
      required: true,
      validator: (name) => Object.keys(icons).includes(name),
    },
  },

  computed: {
    iconSrc() {
      return icons[this.icon];
    },
  },
};
</script>

<style scoped>
.icon {
  display: block;
}
</style>
