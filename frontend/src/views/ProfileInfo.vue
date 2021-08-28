<template>
  <div>
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
  </div>
</template>


<script>
import Title from "@/components/Title.vue";
import ProfileCard from "@/components/ProfileCard.vue";

export default {
  name: 'ProfileInfo',
  components: {
    Title, 
    ProfileCard
  }
}
</script>