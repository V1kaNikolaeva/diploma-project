<template>
  <div>
  <label class="label" for="">{{ labelText }}</label>
  <div class="select" v-on-click-outside="outsideClose">
    <UiButton :light="light" buttonType="select" :border="true" :openSelect="open" @click="selectBar()">
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
</div>
</template>

<script setup>
import UiIcon from './UIIcon.vue';
import { vOnClickOutside } from '@vueuse/components'
import UiButton from './UiButton.vue';
import { ref, computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  showItemFirst: {
    type: String,
    required: false,
  },
  labelText: {
    type: String,
    required: false,
  }
});

const emits = defineEmits(['update:modelValue']);

let visibility = ref('hidden');
let open = ref(false);
let light = ref(false);
const lightColor = computed(() => {
  return light ? '#7f7f7f' : '#3e3e3e'
})


const outsideClose = () => {
  light = false;
  visibility.value = 'hidden';
  open.value = false
}

const selectBar = () => {
  open.value = !open.value;
  if (open.value === true) {
    light = true;
    visibility.value = 'visible';
  } else if (open.value === false) {
    light = false;
    visibility.value = 'hidden';
  }
};

let currentItem = props.showItemFirst ? ref(props.showItemFirst) : ref(props.items[0].name);

const pickedItem = (name, value) => {
  light = false;
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
  position: absolute;
  z-index: 6;
  width: 130px;
  background-color: var(--main-bg);
  visibility: v-bind(visibility);
  border: 1px solid v-bind(lightColor);
  border-radius: 0px 0px 10px 10px;
}
.label {
  display: block;
  width: 100%;
  margin-bottom: 5px;
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
