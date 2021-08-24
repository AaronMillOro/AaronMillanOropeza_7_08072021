<template>
  <div>
    <Title titleName="Se connecter"/>
    <div class="container-fluid pb-4">
      <div class="row">
        <div class="col col-sm-2"></div>
        <div class="col col-sm-8">
          <router-view> 
            <LoginForm color="danger" text="Connexion" />
          </router-view>
        </div>
        <div class="col col-sm-2"></div>
      </div>
    </div>
  </div>
</template>


<script>
import Title from "@/components/Title.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: 'Login',
  components: {
    Title,
    LoginForm,
  }
}
</script>