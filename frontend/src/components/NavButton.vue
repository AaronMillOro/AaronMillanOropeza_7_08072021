<template>
  <router-link to={url} class="btn btn-outline-light px-2 mx-2">{{ name }}</router-link>
</template>

<script>
export default {
  name: "NavButton",
  props:  {
    url: String,
    name: String
  }
}
</script>