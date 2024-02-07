<template>
  <header class="nav__header">
    <div class="logoWrapper">
      <div class="logo">
        <h1>Incomes</h1>
      </div>
    </div>

    <div class="navWrapper">
      <nav class="navigation">
        <h1>
          <RouterLink 
            :to="{ name: 'home' }" 
            class="link" 
            exactActiveClass="active-link"
          >
              Главная
          </RouterLink>
        </h1>
        <h1>
          <RouterLink 
            :to="{ name: 'graphs' }" 
            class="link" 
            exactActiveClass="active-link"
          >
              Графики
          </RouterLink>
        </h1>
        <h1>
          <RouterLink 
            :to="{ name: 'signup' }" 
            class="link" 
            exactActiveClass="active-link"
          >
              Регистрация
          </RouterLink>
        </h1>
        <h1>
          <RouterLink 
            :to="{ name: 'login' }" 
            class="link" 
            exactActiveClass="active-link"
            v-if="!userName"
          >
              Войти
          </RouterLink>
          <RouterLink 
            :to="{ name: 'profile' }" 
            class="link" 
            exactActiveClass="active-link"
            v-else="userName"
          >
              {{ userName }}
          </RouterLink>
        </h1>
      </nav>
    </div>

  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  userName: {
    required: true,
  }
})

</script>

<style scoped>
.nav__header {
  color: var(--main-text);
  background-color: var(--main-bg);
  top: 0;
  height: 80px;
  width: 100%;
  margin: 0px auto;
  padding: 20px;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 4;
  border-bottom: 1px solid var(--main-line);
}
.logoWrapper{ 
  height: 100%;
  align-items: center;
  display: inline-flex;
}
.navWrapper {
  width: 700px;
}
.navigation { 
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.link {
  color: var(--main-text);
  cursor: pointer;
  text-decoration: none;
}
.link::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: var(--light-green);
    transition: width .3s;
}
.link:hover::after {
    width: 100%;
    transition: width .3s;
}
.link:hover {
  color: var(--light-green);
  transition: .3s;
}

.active-link {
  color: var(--light-green);
  border-bottom: 2px var(--light-green) solid;
}

.nav__active {
  color: var(--light-green)
}  
  
</style>