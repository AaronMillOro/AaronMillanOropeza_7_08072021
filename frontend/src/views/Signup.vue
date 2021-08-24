<template>
  <div>
    <Title titleName="S'inscrire"/>
    <div class="container-fluid pb-4">
      <div class="row">
        <div class="col col-sm-2"></div>
        <div class="col col-sm-8">
          <router-view> 
            <SignForm color="success" text="Inscription" />
          </router-view>
        </div>
        <div class="col col-sm-2"></div>
      </div>
    </div>
  </div>
</template>


<script>
import Title from "@/components/Title.vue";
import SignForm from "@/components/SignForm.vue";

export default {
  name: 'Signup',
  components: {
    Title,
    SignForm
  }
}
</script>
