<template>
  <EnterForm :formType="'signUp'" :submitText="'Зарегистрироваться'" :headerText="'Регистрация'"/>
</template>

<script>
import EnterForm from '../components/EnterForm.vue'
import axios from 'axios'
export default {
    components: {
        EnterForm,
    },

    setup() {
      
    }
}

</script>

<style scoped>

</style>
