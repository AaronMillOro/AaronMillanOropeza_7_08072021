<template>
  <div>
    <HeaderButtons/>
    <main>
      <Title titleName="Image à afficher"/>
      <div class="container-fluid pb-4">
        <div class="row">
          <div class="col col-sm-1"></div>
          <div class="col col-sm-10"> 
            <router-view> <ImageForm/> </router-view>
          </div>
          <div class="col col-sm-1"></div>
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
import ImageForm from "@/components/ImageForm.vue";

export default {
  name: 'ProfileImage',
  components: {
    HeaderButtons,
    Title,
    ImageForm,
    Footer,
  }
}
</script>