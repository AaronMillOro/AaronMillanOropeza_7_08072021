<template>
  <div>
    <div v-for="post in Posts" :key="post">
      <div class="card border-info my-4">
        <div class="card-header border-info bg-dark">
          <router-link :to="{ name: 'ProfileInfo', params: { id: post.userId} }">
            <div class="d-flex flex-row align-items-center">
              <div class="mr-2">
                <img src="img/icon-left-font-monochrome-white.4891a9da.svg" :alt="'user_post_' + post.id" class="rounded-circle" width="80" v-if="post.User.imageUrl === null">
                <img :src="post.User.imageUrl" :alt="'user_post_' + post.id" class="rounded-circle" width="80" v-else>
              </div>
              <div class="ml-2">
                <div class="font-weight-bold m-0 text-white">{{ post.User.pseudo }}</div>
                <p class="card-text justify-content-center">
                  <small class="text-white">
                    {{ post.createdAt.split('T')[0] }} à {{ post.createdAt.split('T')[1].split('.')[0] }}
                  </small>
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <router-link :to="{ name: 'Post', params: { id_post: post.id} }">
          <div class="card-body">
            <p class="card-text text-center text-dark">{{ post.text }}</p>
            <div class="text-center"> <img v-show="post.imageUrl !== null" class="img-fluid" :src="post.imageUrl" height="200" :alt="'image_pub_'+ post.id"> </div>
          </div>
          <div class="card-footer border-info bg-white">
            <div class="d-flex flex-row align-items-center">
              <div class="mr-2">
                <p class="card-text mr-0 text-dark"> {{ post.likes }} likes</p> 
              </div>
              <div class="ml-3">
                <p class="card-text mr-0 text-dark"> {{ post.countOpinions }} commentaires</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Posts',
  data() {
    return {
      Posts: [],
    };
  },
  created() {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
    axios.get('http://localhost:3000/api/posts', 
      { headers }
    )
      .then(res => {
        this.Posts = res.data;
      })
      .catch(error => {
        this.$router.push({ name: 'Login'})
        console.log(error)
      });
  }
}
</script>
