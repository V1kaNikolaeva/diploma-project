<template>
  <EnterForm :formType="'signUp'" :submitText="'Зарегистрироваться'" :headerText="'Регистрация'"/>
</template>

<script>
import EnterForm from '../components/EnterForm.vue'

export default {
    components: {
        EnterForm,
    }
}

</script>

<style scoped>

</style>
