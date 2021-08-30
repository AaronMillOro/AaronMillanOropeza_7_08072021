<template>
  <div>
    <HeaderButtons/>
    <main>
      <Title titleName="Mon profile"/>
      <div class="container-fluid pb-4">
        <div class="row">
          <div class="col col-sm-12"> 
            <router-view>
              <ProfileForm/>
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
import ProfileForm from "@/components/ProfileForm.vue";

export default {
  name: 'Profile',
  components: {
    HeaderButtons,
    Title,
    ProfileForm,
    Footer
  }
}
</script>