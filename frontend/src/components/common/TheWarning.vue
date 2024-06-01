<template>
  <div class="warning_wrapper">
    <div class="warning">
      <p>{{ props.warningText }}</p>
    </div>
    <div class="info">
      <slot></slot>
    </div> 
    <div class="checkboxes-contanier" v-if="props.deleteSpendingCheckboxes">
      <div class="solution-checkbox" v-for="checkbox in deleteSpendingCheckboxes">
        <UiCheckbox v-model:checked="checkbox.checked" :checkboxText="checkbox.text" :id="checkbox.id" :value="checkbox.checked"/>
      </div>
    </div>
    <div class="buttons-contanier">
      <UiButton :buttonType="'cancel'" type="submit" :withoutIcon="true" @click="cancel">
        <p>Нет</p>
      </UiButton>
      <UiButton :buttonType="'success'" :withoutIcon="true" @click="submit">
        <p>Да</p>
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import UiCheckbox from '../ui/UiCheckbox.vue';
import UiButton from '../ui/UiButton.vue';

const props = defineProps({
    deleteSpendingCheckboxes: {
        type: Array,
        required: false,
    },
    warningText: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(['update:isModalVisible', 'storeSettings', 'update:deleteSpendingCheckboxes', 'deleteSpending']);
const submit = () => {
  emits('storeSettings', props.deleteSpendingCheckboxes);
  emits('deleteSpending');
  emits('update:deleteSpendingCheckboxes', props.deleteSpendingCheckboxes);
  emits('update:isModalVisible', false);
};
const cancel = () => {
  emits('update:isModalVisible', false);
};
</script>

<style scoped>
.buttons-contanier {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.checkboxes-contanier, .info {
  margin: 20px 0px 20px 0px;
}
</style>
