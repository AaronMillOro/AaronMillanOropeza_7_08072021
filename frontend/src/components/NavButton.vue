<template>
  <router-link v-show="isLogged" to={url} class="btn btn-outline-light px-2 m-2">{{ name }}</router-link>
</template>

<script>
export default {
  name: "NavButton",
  props:  {
    url: String,
    name: String,
  },
  computed : {
    isLogged : function() {
      const currentPath = this.$route.name
      const paths = ["Index", "Profile", "ProfileImage", "ProfileInfo", "Post"]
      if (paths.includes(currentPath)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>