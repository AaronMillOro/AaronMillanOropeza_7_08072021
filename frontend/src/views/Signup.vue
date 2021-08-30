<template>
  <div>
    <Header/>
    <main>
      <Title titleName="S'inscrire"/>
      <div class="container-fluid pb-4">
        <div class="row">
          <div class="col col-sm-2"></div>
          <div class="col col-sm-8">
            <router-view> 
              <SignForm color="success" text="Inscription" />
              <div> <router-link to="/auth/login/" class="text-white bg-secondary p-2">J'ai déjà un compte</router-link> </div>
            </router-view>
          </div>
          <div class="col col-sm-2"></div>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>


<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Title from "@/components/Title.vue";
import SignForm from "@/components/SignForm.vue";

export default {
  name: 'Signup',
  components: {
    Header,
    Title,
    SignForm,
    Footer,
  }
}
</script>
