<template>
  <div>
    <Header/>
    <main>
      <Title titleName="Se connecter"/>
      <div class="container-fluid pb-4">
        <div class="row">
          <div class="col col-sm-2"></div>
          <div class="col col-sm-8">
            <router-view> 
              <LoginForm color="danger" text="Connexion" />
              <div> <router-link to="/auth/signup/" class="text-white bg-secondary p-2">Créer un compte</router-link> </div>
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
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: 'Login',
  components: {
    Header,
    Title,
    LoginForm,
    Footer
  }
}
</script>