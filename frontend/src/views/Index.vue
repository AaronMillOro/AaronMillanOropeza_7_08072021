<template>
  <div>
    <HeaderButtons/>
    <main>
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
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import HeaderButtons from '@/components/HeaderButtons.vue';
import Title from "@/components/Title.vue";
import Posts from "@/components/Posts.vue";
import AddPost from "@/components/AddPost.vue";

export default {
  name: 'Index',
  components: {
    HeaderButtons,
    Title,
    AddPost,
    Posts,
    Footer
  },
}
</script>

