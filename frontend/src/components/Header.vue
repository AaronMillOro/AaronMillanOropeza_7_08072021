<template>
<header class="navbar navbar-dark">
  <div class="navbar-brand">
    <img src="../assets/icon-left-font-monochrome-white.svg" width="250" height="100" class="d-inline-block align-top" alt="Groupomania logo">
  </div>
  <nav class="my-2 my-0 mr3">
    <NavButton to="/auth/account/" name="Mon compte"/>
    <NavButton to="/" name="Actualités"/>
    <NavButton to="/auth/login/" name="Déconnexion"/>
  </nav>
</header>
</template>

<script>
import NavButton from '@/components/NavButton.vue';

export default {
  name: 'Header',
  components: {
    NavButton,
  },
}
</script>

<style scoped>
.navbar {
  background-color: #243447;
}
</style>