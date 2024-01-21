<template>
  <div class="sign-up__wrapper">
    <div class="have-account__contanier">
      <h2>Вход</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem labore magnam, ipsum nihil, at tempora ea sint amet, delectus distinctio ex consequuntur. Explicabo, hic eaque aperiam repudiandae sapiente ipsa.
      </p>
    </div>
    <div class="sign-up__contanier">
      <form action="" @submit.prevent="login">
        <div class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Почта</label>
          <UIInput
            type="text"
            placeholder="Почта"
            v-model="localUserLogin.email"
            :fullWidth="true"
            :multiline="false"
          />
        </div>
        <div class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Пароль</label>
          <UIInput
            type="password"
            name="password"
            autocomplete="off"
            placeholder="Пароль"
            v-model="localUserLogin.password"
            :fullWidth="true"
            :multiline="false"
          />
        </div>
        <div class="sign-up-labels__wrapper">
            <UIButton class="signUp-button" type="submit" :buttonType="'save'">
                <p>Войти</p>
            </UIButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UIInput from "../components/UIInput.vue";
import UIButton from "../components/UIButton.vue";
import axios from "axios";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref } from 'vue'

export default {
  name: "EnterForm",
  components: {
    UIInput,
    UIButton,
  },

  
  props: {
    userLogin: {
      type: Object,
      required: true
    }
  },

  setup(props, context) {
    const userStore = useUserStore();
    const localUserLogin = ref({...props.userLogin});
    const router = useRouter();

    const login = async () => {
      if (localUserLogin.value.email === '') {
        toaster.value.error('Проверьте e-mail');
      } else if (localUserLogin.value.password === '') {
        toaster.value.error('Проверьте пароль');
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
            router.push('/')
          })
          .catch(error => {
            console.log('error', error);
          })
      }
    }

    return {
      login,
      localUserLogin,
      userStore,
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
</style>