<template>
<header class="navbar navbar-dark">
  <div class="navbar-brand">
    <img src="../assets/icon-left-font-monochrome-white.svg" width="250" height="100" class="d-inline-block align-top" alt="Groupomania logo">
  </div>
  <nav class="my-2 my-0 mr3">
    <NavButton :to="{name: 'Profile', params: { 'id': this.userUrl} }" name="Mon compte"/>
    <NavButton :to="{name: 'Index'}" name="Actualités"/>
    <NavButton :to="{name: 'Login'}" @click="logout" name="Déconnexion"/>
  </nav>
</header>
</template>

<script>
import NavButton from '@/components/NavButton.vue';

export default {
  name: 'HeaderButtons',
  components: {
    NavButton,
  },
  data() {
    return {
      userUrl: parseInt(localStorage.getItem('userId')),
    }
  },
  methods: {
    logout(e) {
      e.preventDefault();
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      alert('A bientôt');
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #243447;
}
</style>