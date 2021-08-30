<template>
  <div>
    <HeaderButtons/>
    <main>
      <Title titleName="Publication"/>
      <div class="container-fluid pb-4">
        <div class="row">
          <div class="col col-sm-1 d-none d-sm-block"></div>
          <div class="col col-sm-10"> 
            <router-view> 
              <PostContent/>
            </router-view>
          </div>
          <div class="col col-sm-1 d-none d-sm-block"></div>
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
import PostContent from "@/components/PostContent.vue";

export default {
  name: 'Post',
  components: {
    HeaderButtons,
    Title,
    PostContent,
    Footer,
  }
}
</script>