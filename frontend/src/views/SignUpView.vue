<template>
  <div class="sign-up__wrapper">
    <div class="have-account__contanier">
      <h2>Регистрация</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem labore magnam, ipsum nihil, at tempora ea sint amet, delectus distinctio ex consequuntur. Explicabo, hic eaque aperiam repudiandae sapiente ipsa.
      </p>
      <p>
        Уже есть аккаунт?
        <RouterLink :to="{ name: 'login' }">Нажми сюда</RouterLink>, чтобы войти
      </p>
    </div>
    <div class="sign-up__contanier">
      <form action="" @submit.prevent="addUser">
        <div class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Имя</label>
          <UIInput
            type="text"
            placeholder="Имя"
            
            :fullWidth="true"
            v-model="localUser.name"
          />
        </div>
        <div class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Почта</label>
          <UIInput
            type="text"
            placeholder="Почта"
            
            :fullWidth="true"
            v-model="localUser.email"
          />
        </div>
        <div class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Пароль</label>
          <UIInput
            type="password"
            name="password"
            autocomplete="off"
            placeholder="Пароль"
            
            :fullWidth="true"
            v-model="localUser.password"
          />
        </div>
        <div class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Повторите пароль</label>
          <UIInput
            type="password"
            name="password"
            autocomplete="off"
            placeholder="Повторите пароль"
            :fullWidth="true"
            v-model="localUser.repeatPassword"
          />
        </div>
        <div class="sign-up-labels__wrapper">
            <UIButton class="signUp-button" type="submit" :buttonType="'save'">
                <p>Зарегистрироваться</p>
            </UIButton>
        </div>
      </form>
    </div>
  </div>
  <TheToaster ref="toaster"></TheToaster>
</template>

<script>
import UIInput from "../components/UIInput.vue";
import UIButton from "../components/UIButton.vue";
import TheToaster from "../components/TheToaster.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";
//import axios from 'axios'

export default {
  name: 'SignUpView',

  components: { UIButton, UIInput, TheToaster, TheToaster },

  props: {
    user: {
      type: Object,
      required: true,
    }
  },

  setup(props, context) {
    const toaster = ref(null)
    const handleErrorClick = () => {
      toaster.value.error('Error ' + new Date().toLocaleTimeString());
    }

    const localUser = ref({...props.user})
    const addUser = () => {
      if (localUser.value.name === '') {
        toaster.value.error('Error ' + new Date().toLocaleTimeString());
      } else if (localUser.value.email === '') {
        toaster.value.error('Error ' + new Date().toLocaleTimeString());
      } else if (localUser.value.password === '') {
        toaster.value.error('Error ' + new Date().toLocaleTimeString());
      } else if (localUser.value.repeatPassword === '') {
        toaster.value.error('Error ' + new Date().toLocaleTimeString());
      } else {
        toaster.value.success('Success ' + new Date().toLocaleTimeString());
      }
      
    }



    return {
      localUser,
      addUser,
      toaster,
      handleErrorClick,
    }
  }
}

</script>

<style scoped>
.sign-up__wrapper {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  height: 500px;
  max-width: 1200px;
  justify-content: space-around;
  align-items: center;
}

.have-account__contanier,
.sign-up__contanier {
  width: 40%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
}

.have-account__contanier > * {
    margin: 20px;
    color: var(--main-text);
}

.sign-up-labels__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin: 20px;
}

.sign-up__label {
    width: 100%;
    margin-bottom: 5px;
}

.signUp-button {
    width: 100%; 
    /* не рабоатет */
}
</style>
