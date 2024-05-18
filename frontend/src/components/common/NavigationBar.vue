<template>
  <header class="nav__header">
    <div class="logoWrapper">
        <div class="logo">
          <h1>Incomes</h1>
        </div>
      </div>
    <div class="navWrapper" ref="navWrapper">

      <nav class="nav-contanier">
        <ul class="navigation" ref="navigation">
          <li class="nav-item">
            <RouterLink @click="closeMenu($event)" :to="{ name: 'tips' }" class="link" exactActiveClass="active-link">
              Советы
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              @click="closeMenu($event)"
              :to="{ name: 'home', params: { id: userStore.user.id } }"
              class="link"
              exactActiveClass="active-link"
            >
              Главная
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              @click="closeMenu($event)"
              :to="{ name: 'graphs', params: { id: userStore.user.id } }"
              class="link"
              exactActiveClass="active-link"
            >
              Графики
            </RouterLink>
          </li>

          <li class="nav-item" v-if="!userStore.user.isAuthenticated">
            <RouterLink @click="closeMenu($event)" :to="{ name: 'signup' }" class="link" exactActiveClass="active-link">
              Регистрация
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              @click="closeMenu($event)"
              :to="{ name: 'login' }"
              class="link"
              exactActiveClass="active-link"
              v-if="!userName"
            >
              Войти
            </RouterLink>
            <RouterLink
              @click="closeMenu($event)"
              :to="{ name: 'profile' }"
              class="link"
              exactActiveClass="active-link"
              v-else="userName"
            >
              {{ userName }}
            </RouterLink>
          </li>
        </ul>
        <div class="hamburger" ref="hamburger" @click="menu()">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { onClickOutside } from '@vueuse/core';
import { computed, ref } from 'vue';

const props = defineProps({
  userName: {
    required: true,
  },
});

const userStore = useUserStore();

const userNameExist = computed(() => {
  return userStore.user.name ? userStore.user.name : 'Войти';
});

const hamburger = ref(null);
const navigation = ref(null);
const navWrapper = ref(null);

onClickOutside(navWrapper, (event) => closeMenu(event));

const closeMenu = (e) => {
  const withinBoundaries = e.composedPath().includes(hamburger) || e.composedPath().includes(navigation);
  if (!withinBoundaries) {
    hamburger.value.classList.remove('active');
    navigation.value.classList.remove('active');
  }
};
const menu = () => {
  hamburger.value.classList.toggle('active');
  navigation.value.classList.toggle('active');
};
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
.logoWrapper {
  height: 100%;
  align-items: center;
  display: inline-flex;
}
.navWrapper {
  width: 700px;
}

.nav-contanier {
  height: 100%;
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
  font-size: 20px;
}
.link::after {
  content: '';
  display: block;
  width: 0;
  height: 1px;
  background: var(--light-green);
  transition: width 0.3s;
}
.link:hover::after {
  width: 100%;
  transition: width 0.3s;
}
.link:hover {
  color: var(--light-green);
  transition: 0.3s;
}

.active-link {
  color: var(--light-green);
  border-bottom: 1px var(--light-green) solid;
}
.nav-item {
  margin-right: 60px;
}
.nav-item:last-child {
  margin-right: 0;
}

.nav__active {
  color: var(--light-green);
}
.hamburger {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 35px;
  height: 3px;
  margin: 5px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: var(--light-green);
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
    margin-right: 20px;
    z-index: 5;
  }

  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  .logoWrapper {
    display: none;
  }
  .navWrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .navigation {
    display: flex;
    position: fixed;
    left: -100%;
    top: 0;
    padding-top: 80px;
    flex-direction: column;
    background-color: var(--main-bg);
    border-bottom: 1px solid var(--main-line);
    width: 100%;
    height: 420px;
    align-items: center;
    transition: 0.3s;
    z-index: 4;
  }
  .nav-contanier {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .nav-item {
    margin: 16px 0;
  }

  .navigation.active {
    left: 0;
  }
}
</style>
