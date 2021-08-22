<template>
<div class="container py-2">
  <div class="row justify-content-center"> 
    <h1 class="text-info py-2">{{ titleName }}</h1>
  </div>
</div>
</template>

<script>
export default {
  name: "Title",
  props: {
    titleName: String
  }
}
</script>