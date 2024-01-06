<template>
  <img class="icon" :alt="icon" :src="iconSrc" />
</template>

<script>
import Close from "../assets/icons/icon-close.svg";
import Sort from "../assets/icons/icon-sort.svg";
import Add from "../assets/icons/icon-add.svg";
import Arrow from "../assets/icons/icon-right-arrow.svg";


const icons = {
  "close": Close,
  "sort": Sort,
  "add": Add,
  "arrow": Arrow,
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
