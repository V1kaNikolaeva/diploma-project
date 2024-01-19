<template>
  <div class="sign-up__wrapper">
    <div class="have-account__contanier">
      <h2>{{ headerText }}</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem labore magnam, ipsum nihil, at tempora ea sint amet, delectus distinctio ex consequuntur. Explicabo, hic eaque aperiam repudiandae sapiente ipsa.
      </p>
      <p v-if="formType === 'signUp'">
        Уже есть аккаунт?
        <RouterLink :to="{ name: 'login' }">Нажми сюда</RouterLink>, чтобы войти
      </p>
    </div>
    <div class="sign-up__contanier">
      <form action="">
        <div v-if="formType === 'signUp'" class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Имя</label>
          <UIInput
            type="text"
            placeholder="Имя"
            required
            :fullWidth="true"
            :multiline="false"
          />
        </div>
        <div class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Почта</label>
          <UIInput
            type="text"
            placeholder="Почта"
            required
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
            required
            :fullWidth="true"
            :multiline="false"
          />
        </div>
        <div v-if="formType === 'signUp'" class="sign-up-labels__wrapper">
          <label class="sign-up__label" for="">Повторите пароль</label>
          <UIInput
            type="password"
            name="password"
            autocomplete="off"
            placeholder="Повторите пароль"
            :fullWidth="true"
            :multiline="false"
          />
        </div>
        <div class="sign-up-labels__wrapper">
            <UIButton @click="sendform" class="signUp-button" type="submit" :buttonType="'save'">
                <p>{{ submitText }}</p>
            </UIButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UIInput from "../components/UIInput.vue";
import UIButton from "../components/UIButton.vue";
import { RouterLink } from "vue-router";
import { createAccount } from '../../projectServices';


export default {
  name: "EnterForm",
  components: {
    UIInput,
    UIButton,
  },
  props: {
    formType: {
      type: String,
      required: true,
      validator: (item) => ["signUp", "logIn"].includes(item),
    },
    submitText: {
      type: String,
      required: true,
    },
    headerText: {
        type: String,
        required: true,
    }
  },

  emits: ['submit'],

  data() {
    return {
      localCreateAccount: { ...createAccount }
    }
  },

  methods: {
    sendform() {
      this.$emit('submit', this.localCreateAccount)
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
