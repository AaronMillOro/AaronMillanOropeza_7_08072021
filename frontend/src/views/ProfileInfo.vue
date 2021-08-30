<template>
  <div>
    <HeaderButtons/>
    <main>
      <Title titleName="Utilisateur"/>
      <div class="container-fluid pb-4">
        <div class="row">
          <div class="col col-sm-1"></div>
          <div class="col col-sm-10">
            <router-view> 
              <ProfileCard/>
            </router-view>
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
import ProfileCard from "@/components/ProfileCard.vue";

export default {
  name: 'ProfileInfo',
  components: {
    HeaderButtons,
    Title, 
    ProfileCard,
    Footer
  }
}
</script>