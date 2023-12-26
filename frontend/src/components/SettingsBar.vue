<template>
    <div class="settings__contanier">
        <UIButton @click="openModalWindow(true)" :buttonType="'add'"><p>Добавить</p></UIButton>
    </div>
</template>
  
<script>
import UIButton from './UIButton.vue';

export default {
    name: 'SettingsBar',
    components: { UIButton },
    props: {
        isModalVisible: {
            type: Boolean,
            required: true,
        }
    },

    emits: ['update:isModalVisible'],

    methods: {
        openModalWindow(value) {
            this.$emit('update:isModalVisible', value)
        }
    }
}

</script>

<style scoped>
.settings__contanier {
    margin-top: 10px;
    width: 100%;
}

</style>