<template>
  <div>
    <Title titleName="Publication"/>
    <div class="container-fluid pb-4">
      <div class="row">
        <div class="col col-sm-1"></div>
        <div class="col col-sm-10"> 
          <router-view> 
            <PostContent/>
          </router-view>
        </div>
        <div class="col col-sm-1"></div>
      </div>
    </div>
  </div>
</template>


<script>
import Title from "@/components/Title.vue";
import PostContent from "@/components/PostContent.vue";

export default {
  name: 'Post',
  components: {
    Title,
    PostContent,
  }
}
</script>