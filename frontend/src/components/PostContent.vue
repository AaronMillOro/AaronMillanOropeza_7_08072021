<template>
  <div>
    <div class="card border-info my-4">
      <div class="card-header border-info bg-dark">
        <div class="d-flex flex-row align-items-center">
          <div class="mr-2 col-sm-3">
            <img :src="this.user.imageUrl" :alt="'user_post_' + this.post.id" class="rounded-circle" width="80" v-if="this.user.imageUrl !== null">
            <img src="/img/icon-left-font-monochrome-white.4891a9da.svg" :alt="'user_post_' + this.post.id" class="rounded-circle" width="80" v-else>
          </div>
          <div class="ml-2 col-sm-8">
            <div class="font-weight-bold m-0 text-white">{{ this.user.pseudo }}</div>
            <p class="card-text justify-content-center">
              <small class="text-white"> {{ this.date }} à {{ this.time }} </small>
            </p>
          </div>
          <div class="mx-2 col-sm-1"> 
            <BIconTrashFill class="text-white" v-if="this.dataPost.canDelete === true"/> 
            <BIconTrashFill class="text-white" v-if="this.dataPost.canDelete === 'all'"/> 
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text text-center text-dark">{{ this.post.text }}</p>
        <div class="text-center"> <img v-show="this.post.imageUrl !== null" class="img-fluid" :src="this.post.imageUrl" height="200" :alt="'image_pub_'+ this.post.id"> </div>
      </div>
        <div class="card-footer border-info bg-white">
          <div class="d-flex flex-row align-items-center">
            <div class="mr-2">
              <p class="card-text mr-0"> 
                {{ this.post.likes }} 
                <BIconHeart class="text-danger" role="img" aria-label="Heart" v-if="this.dataPost.heart === 'off_heart'" />
                <BIconHeartFill class="text-danger" role="img" aria-label="Filled Heart" v-else/>
              </p></div>
            <div class="ml-3"> <p class="card-text mr-0"> {{ this.post.countOpinions }} commentaires</p> </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostContent',
  data() {
    return {
      dataPost: "",
      user: "",
      post: "",
      date: "",
      time: ""
    };
  },
  created() {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    } 
    axios.get('http://localhost:3000/api/posts/' + this.$route.params.id_post,
      { headers }
    )
      .then(res => {
        this.dataPost = res.data;
        this.post = res.data.post;
        this.user = res.data.post.User;
        this.date = this.post.createdAt.split('T')[0];
        this.time = this.post.createdAt.split('T')[1].split('.')[0];
        console.log(this.$route.params.id_post);
        return console.log(res);
      })
      .catch(error => {
        return console.log(error)
      });
  }
}
</script>