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
import Medkit from "../assets/icons/icon-medkit.svg"
import Cart from "../assets/icons/icon-cart.svg"
import Controller from "../assets/icons/icon-gamepad.svg"
import Laptop from "../assets/icons/icon-laptop.svg"
import Plane from "../assets/icons/icon-plane.svg"
import Tshirt from "../assets/icons/icon-t-shirt.svg"
import Gift from "../assets/icons/icon-gift.svg"
import Other from "../assets/icons/icon-other.svg"

const icons = {
  "close": Close,
  "sort": Sort,
  "add": Add,
  "arrow": Arrow,
  "error": Error,
  "check": Check,
  "edit": Edit,
  "medkit": Medkit,
  "cart": Cart,
  "gamepad": Controller,
  "laptop": Laptop,
  "plane": Plane,
  "t-shirt": Tshirt,
  "gift": Gift,
  "other": Other,
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
