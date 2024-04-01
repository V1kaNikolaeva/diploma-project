<template>
  <div class="select" v-on-click-outside="outsideClose">
    <UiButton buttonType="select" :border="true" :openSelect="open" @click="selectBar()">
      <p>{{ currentItem }}</p>
      <template #right-icon>
        <UiIcon :icon="open ? 'downArrow' : 'upArrow'" />
      </template>
    </UiButton>
    <ul class="list">
      <li class="item" v-for="item in items" :value="item.name" @click="pickedItem(item.name, item.value)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import UiIcon from './UIIcon.vue';
import { vOnClickOutside } from '@vueuse/components'
import UiButton from './UiButton.vue';
import { ref } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(['update:modelValue']);

let visibility = ref('hidden');
let open = ref(false);

const outsideClose = () => {
  visibility.value = 'hidden';
  open.value = false
}

const selectBar = () => {
  open.value = !open.value;
  if (open.value === true) {
    visibility.value = 'visible';
  } else if (open.value === false) {
    visibility.value = 'hidden';
  }
};

let currentItem = ref(props.items[0].name);

const pickedItem = (name, value) => {
  currentItem.value = name;
  open.value = !open.value;
  visibility.value = 'hidden';
  emits('update:modelValue', value);
};
</script>

<style scoped>
.select {
  max-width: 130px;
}
.list {
  visibility: v-bind(visibility);
  border: 1px solid var(--button-color);
  border-radius: 0px 0px 10px 10px;
}
.item {
  padding: 5px;
  cursor: pointer;
}
.item:last-child {
  border-radius: 0px 0px 10px 10px;
}
.item:hover {
  background-color: var(--button-color);
}
</style>
