<template>
  <div>
    <Title titleName="Actualités"/>
    <div class="container-fluid pb-4">
      <div class="row">
        <div class="col col-sm-12">
          <router-view>
            <AddPost/>
            <Posts/> 
          </router-view>
        </div>
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

