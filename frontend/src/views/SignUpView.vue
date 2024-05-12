<template>
  <div class="sign-up__wrapper">
    <div class="have-account__contanier">
      <h2>Регистрация</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem labore magnam, ipsum nihil, at
        tempora ea sint amet, delectus distinctio ex consequuntur. Explicabo, hic eaque aperiam repudiandae sapiente
        ipsa.
      </p>
      <p>
        Уже есть аккаунт?
        <RouterLink :to="{ name: 'login' }">Нажми сюда</RouterLink>, чтобы войти
      </p>
    </div>
    <div class="sign-up__contanier">
      <form action="" @submit.prevent="signup">
        <div class="sign-up-labels__wrapper">
          <UIInput
            :invalid="v.name.$error"
            type="text"
            placeholder="Имя"
            label="Имя"
            :fullWidth="true"
            v-model="localSignupUser.name"
          />
          <UiErrorContanier>
            <ErrorMessage
              :messageType="v.name.required.$invalid ? 'required' : false"
              labelName="имя"
              v-show="v.name.$error"
            ></ErrorMessage>
          </UiErrorContanier>
        </div>
        <div class="sign-up-labels__wrapper">
          <UIInput
            :invalid="v.email.$error"
            type="text"
            placeholder="Почта"
            label="Почта"
            :fullWidth="true"
            v-model="localSignupUser.email"
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
            :fullWidth="true"
            v-model="localSignupUser.password"
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
          <UIInput
            :invalid="v.repeatPassword.$error"
            type="password"
            name="password"
            autocomplete="off"
            placeholder="Повторите пароль"
            label="Повторите пароль"
            :fullWidth="true"
            v-model="localSignupUser.repeatPassword"
          />
          <UiErrorContanier>
            <ErrorMessage
              :messageType="v.repeatPassword.required.$invalid ? 'required' :
              v.repeatPassword.minLength.$invalid ? 'small' 
              : false"
              labelName="пароль"
              v-show="v.repeatPassword.$error"
            ></ErrorMessage>
          </UiErrorContanier>
        </div>
        <div class="sign-up-labels__wrapper">
          <UIButton class="signUp-button" type="submit" buttonType="success" successMargin="0px">
            <p>Зарегистрироваться</p>
          </UIButton>
        </div>
      </form>
    </div>
  </div>
  <TheToaster ref="toaster"></TheToaster>
</template>

<script>
import UIInput from '../components/ui/UiInput.vue';
import UIButton from '../components/ui/UiButton.vue';
import TheToaster from '../components/common/TheToaster.vue';
import ErrorMessage from '../components/common/ErrorMessage.vue';
import UiErrorContanier from '../components/ui/UiErrorContanier.vue';
import { signupUser } from '../services/projectServices';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'SignUpView',

  components: { UIButton, UIInput, TheToaster, UiErrorContanier, ErrorMessage },

  setup() {
    const toaster = ref(null);
    const router = useRouter();

    //простой конструктор для User
    const userSignup = signupUser();

    const localSignupUser = ref({ ...userSignup });
    const rules = {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      repeatPassword: { required, minLength: minLength(6) },
    };
    const v = useVuelidate(rules, localSignupUser);

    const signup = () => {
      if (v.value.$invalid) {
        v.value.$touch();
      } else {
        axios
          .post('/api/signup/', localSignupUser.value)
          .then((response) => {
            if (response.data.message === 'success') {
              toaster.value.success('Вы зарегистрировались!'); //починить Je89cC2ThV3y
              router.push('/login');
            } else {
              toaster.value.error('Проверьте поля');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    return {
      userSignup,
      localSignupUser,
      signup,
      toaster,
      v,
      rules,
    };
  },
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
