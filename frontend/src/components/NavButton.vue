<template>
  <router-link to={url} class="btn btn-outline-light px-2 m-2">{{ name }}</router-link>
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