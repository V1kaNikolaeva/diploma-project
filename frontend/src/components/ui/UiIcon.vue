<template>
  <img class="icon" :alt="icon" :src="iconSrc" />
</template>

<script>
import Close from '../../assets/icons/icon-close.svg';
import SortUp from '../../assets/icons/icon-sort-up.svg';
import SortDown from '../../assets/icons/icon-sort-down.svg';
import SortCommon from '../../assets/icons/icon-sort-common.svg';
import Add from '../../assets/icons/icon-add.svg';
import Delete from '../../assets/icons/icon-delete.svg';
import Change from '../../assets/icons/icon-change.svg';
import Arrow from '../../assets/icons/icon-right-arrow.svg';
import Error from '../../assets/icons/icon-error.svg';
import Check from '../../assets/icons/icon-check.svg';
import Edit from '../../assets/icons/icon-edit.svg';
import Pulse from '../../assets/icons/icon-pulse.svg';
import Cart from '../../assets/icons/icon-cart.svg';
import Guitar from '../../assets/icons/icon-acoustic-guitar.svg';
import Smartwatch from '../../assets/icons/icon-smartwatch.svg';
import Plane from '../../assets/icons/icon-plane.svg';
import Tshirt from '../../assets/icons/icon-t-shirt.svg';
import Gift from '../../assets/icons/icon-gift.svg';
import Search from '../../assets/icons/icon-search.svg';
import Bank from '../../assets/icons/icon-bank.svg';
import DownArrow from '../../assets/icons/icon-down-arrow.svg';
import UpArrow from '../../assets/icons/icon-up-arrow.svg';
import Archive from '../../assets/icons/icon-archive.svg';
import Cancel from '../../assets/icons/icon-cancel.svg';
import Submit from '../../assets/icons/icon-submit.svg';
import Actions from '../../assets/icons/icon-actions.svg';
import Categories from '../../assets/icons/icon-categories.svg';
import Sorting from '../../assets/icons/icon-sorting.svg';

const icons = {
  'close': Close,
  'sortUp': SortUp,
  'sortDown': SortDown,
  'sortCommon': SortCommon,
  'add': Add,
  'delete': Delete,
  'change': Change,
  'arrow': Arrow,
  'error': Error,
  'check': Check,
  'edit': Edit,
  'pulse': Pulse,
  'cart': Cart,
  'acousticGuitar': Guitar,
  'smartwatch': Smartwatch,
  'plane': Plane,
  'tShirt': Tshirt,
  'gift': Gift,
  'search': Search,
  'bank': Bank,
  'downArrow': DownArrow,
  'upArrow': UpArrow,
  'archive': Archive,
  'cancel': Cancel,
  'submit': Submit,
  'actions': Actions,
  'categories': Categories,
  'sorting': Sorting,
};

export default {
  name: 'UIIcon',

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
