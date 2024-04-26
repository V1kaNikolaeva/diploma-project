<template>
    <small class="error-message" v-if="messageType === 'required'">Поле {{ labelName }} обязательно для заполнения</small>
    <small class="error-message" v-else-if="messageType === 'numeric'">Поле {{ labelName }} должно содеражать число без пробелов</small>
    <small class="error-message" v-else-if="messageType === 'zero'">Поле {{ labelName }} не должно быть нулем</small>
    <small class="error-message" v-else-if="messageType === 'long'">Поле {{ labelName }} имеет слишком много символов</small>
</template>

<script setup>

const props = defineProps({
    messageType: {
        type: [String, Boolean],
        required: true,
    },
    labelName: {
        type: String,
        required: true,
    },
})

</script>


<style scoped>
.error-message {
    display: block;
    margin: 5px 5px 5px 0px;
    color: var(--red-error);
}
.error-message:focus {
    box-shadow: none;
    outline-style: none;
    outline-width: 0px !important;
    outline-color: none !important;
}

</style>
