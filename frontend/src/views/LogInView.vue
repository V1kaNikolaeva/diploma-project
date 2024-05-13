<template>
  <div class="sign-up__wrapper">
    <div class="have-account__contanier">
      <h2>Вход</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem labore magnam, ipsum nihil, at tempora ea sint amet, delectus distinctio ex consequuntur. Explicabo, hic eaque aperiam repudiandae sapiente ipsa.
      </p>
      <p>
        Нет аккаунта?
        <RouterLink :to="{ name: 'signup' }">Нажми сюда</RouterLink>, чтобы зарегистрироваться
      </p>
    </div>
    <div class="sign-up__contanier">
      <form action="" @submit.prevent="login">
        <div class="sign-up-labels__wrapper">
          <UIInput
            :invalid="v.email.$error"
            type="text"
            placeholder="Почта"
            label="Почта"
            v-model="localUserLogin.email"
            :fullWidth="true"
            :multiline="false"
          />
          <UiErrorContanier>
            <ErrorMessage
              :messageType="v.email.required.$invalid ? 'required' :
              v.email.email.$invalid ? 'email'
              : false"
              labelName="почта"
              v-show="v.email.$error"
            ></ErrorMessage>
          </UiErrorContanier>
        </div>
        <div class="sign-up-labels__wrapper">
          <UIInput
            :invalid="v.password.$error"
            type="password"
            name="password"
            autocomplete="off"
            placeholder="Пароль"
            label="Пароль"
            v-model="localUserLogin.password"
            :fullWidth="true"
            :multiline="false"
          />
          <UiErrorContanier>
            <ErrorMessage
              :messageType="v.password.required.$invalid ? 'required' :
              v.password.minLength.$invalid ? 'small' 
              : false"
              labelName="пароль"
              v-show="v.password.$error"
            ></ErrorMessage>
          </UiErrorContanier>
        </div>
        <div class="sign-up-labels__wrapper">
            <UIButton class="signUp-button" type="submit" buttonType="success" successMargin="0px">
                <p>Войти</p>
            </UIButton>
        </div>
      </form>
    </div>
  </div>
  <TheToaster ref="toaster"></TheToaster>
</template>

<script>
import UIInput from "../components/ui/UiInput.vue";
import UIButton from "../components/ui/UiButton.vue";
import TheToaster from "../components/common/TheToaster.vue";
import ErrorMessage from '../components/common/ErrorMessage.vue';
import UiErrorContanier from '../components/ui/UiErrorContanier.vue';
import { useVuelidate } from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import axios from "axios";
import { loginUser } from "../services/projectServices";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref } from 'vue'

export default {
  name: "EnterForm",
  components: {
    UIInput,
    UIButton,
    TheToaster,
    UiErrorContanier,
    ErrorMessage,
  },

  setup(props, context) {
    const userStore = useUserStore();
    const toaster = ref(null);

    const userLogin = loginUser();
    const localUserLogin = ref({...userLogin});
    const router = useRouter();
    const rules = {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
    const v = useVuelidate(rules, localUserLogin);
    const login = async () => {
      if (v.value.$invalid) {
        v.value.$touch();
      } else {
        //login
        await axios
          .post('/api/login/', localUserLogin.value)
          .then(response => {
            userStore.setToken(response.data);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access
          })
          .catch(error => {
            console.log('error', error);
          })
        //user page
        await axios
          .get('/api/home/')
          .then(response => {
            userStore.setUserInfo(response.data);
            toaster.value.success('Вы авторизировались!'); //починить Je89cC2ThV3y
            router.push({ name: 'home', params: { 'id': userStore.user.id } })
          })
          .catch(error => {
            console.log('error', error);
          })
      }
    }

    return {
      toaster,
      login,
      userLogin,
      localUserLogin,
      userStore,
      v,
      rules,
    }
  }
};
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
@media screen and (max-width: 768px) {
  .sign-up__wrapper {
    display: flex;
    flex-direction: column;
    margin: 20px;
    height: 100%;
  }
  .have-account__contanier,
  .sign-up__contanier {
    width: 100%;
  }
}
</style>