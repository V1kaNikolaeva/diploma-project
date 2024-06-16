<template>
    <small class="error-message" v-if="messageType === 'required'">Поле {{ labelName }} обязательно для заполнения</small>
    <small class="error-message" v-else-if="messageType === 'numeric'">Поле {{ labelName }} должно содеражать число без пробелов</small>
    <small class="error-message" v-else-if="messageType === 'zero'">Поле {{ labelName }} не должно быть нулем</small>
    <small class="error-message" v-else-if="messageType === 'zeroFirst'">В поле {{ labelName }} ноль в начале</small>
    <small class="error-message" v-else-if="messageType === 'long'">Поле {{ labelName }} имеет слишком много символов</small>
    <small class="error-message" v-else-if="messageType === 'small'">Поле {{ labelName }} должно быть содержать более {{ symbols }} символов</small>
    <small class="error-message" v-else-if="messageType === 'sameEmail'">Такая почта уже занята</small>
    <small class="error-message" v-else-if="messageType === 'email'">Неправильный формат почты</small>
    <small class="error-message" v-else-if="messageType === 'password'">Пароли не совпали</small>
    <small class="error-message" v-else-if="messageType === 'backendError'">Подтвердите почту или проверьте правильно ли введены данные</small>
</template>

<script setup>

const props = defineProps({
    messageType: {
        type: [String, Boolean],
        required: true,
    },
    labelName: {
        type: String,
        required: false,
    },
    symbols: {
        type: Number,
        required: false,
        default: 6,
    }
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
