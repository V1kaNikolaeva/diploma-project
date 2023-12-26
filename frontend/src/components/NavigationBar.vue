<template>
  <header class="nav__header">
    <div class="logoWrapper">
      <div class="logo">
        <h1>Incomes and Extences</h1>
      </div>
    </div>

    <div class="navWrapper">
      <nav class="navigation">
        <h1>
          <RouterLink 
            :to="{ name: 'home' }" 
            class="link" 
          >
              Главная
          </RouterLink>
        </h1>
        <h1>
          <RouterLink 
            :to="{  }" 
            class="link" 
          >
              Графики
          </RouterLink>
        </h1>
        <h1>
          <RouterLink 
            :to="{  }" 
            class="link" 
          >
              Профиль
          </RouterLink>
        </h1>
        <h1>
          <RouterLink 
            :to="{  }" 
            class="link" 
          >
              Войти
          </RouterLink>
        </h1>
      </nav>
    </div>

  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  data() {
    return {
    }    
  },
}
</script>

<style scoped>
.nav__header {
  color: var(--main-text);
  background-color: var(--main-bg);
  top: 0;
  height: 100px;
  width: 100%;
  margin: 0px auto;
  padding: 20px;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 4;
  border-bottom: 1px solid var(--main-nav-underline);
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
.link:hover {
  color: var(--light-green);
  transition: .3s;
}

.nav__active {
  color: var(--light-green)
}  
  
</style>