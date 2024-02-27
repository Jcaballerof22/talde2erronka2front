<script setup>
  import {ref} from "vue";
  import Menu from './components/Menu.vue'

  //Funtzioak
  const translate = (hizkuntza) => {
    sessionStorage.setItem("hizkuntza", hizkuntza);
    window.location.reload();
  }

</script>

<template>
  <Menu  @translate = "translate" @hizkuntzaLortu = "hizkuntzaLortu"></Menu>
  <router-view></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
