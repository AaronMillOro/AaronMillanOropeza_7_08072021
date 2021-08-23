<template>
  <div>
    <Title titleName="Information d'utilisateur"/>
    <div class="container-fluid pb-4">
      <router-view> </router-view>
      <div class="row">
        <div class="col col-sm-1"></div>
        <div class="col col-sm-10"> </div>
        <div class="col col-sm-1"></div>
      </div>
    </div>
  </div>
</template>


<script>
import Title from "@/components/Title.vue"

export default {
  name: 'ProfileInfo',
  components: {
    Title
  }
}
</script>