<template>
  <div>
    <Title titleName="Actualités"/>
    <div class="container-fluid pb-4">
      <div class="row">
        <div class="col col-sm-1"></div>
        <div class="col col-sm-10">
          <router-view>
            <AddPost/>
            <Posts/> 
          </router-view>
        </div>
        <div class="col col-sm-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Posts from "@/components/Posts.vue";
import AddPost from "@/components/AddPost.vue";

export default {
  name: 'Index',
  components: {
    Title,
    Posts,
    AddPost,
  },
}
</script>

