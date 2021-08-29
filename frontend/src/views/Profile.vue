<template>
  <div>
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
  </div>
</template>


<script>
import Title from "@/components/Title.vue";
import ProfileForm from "@/components/ProfileForm.vue";

export default {
  name: 'Profile',
  components: {
    Title,
    ProfileForm
  }
}
</script>