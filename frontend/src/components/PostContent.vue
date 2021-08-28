<template>
  <div>
    <!-- Post information --> 
    <div class="card border-info my-4">
      <div class="card-header border-info bg-dark">
        <div class="d-flex align-items-center">
          <div class="mr-2">
            <img :src="this.user.imageUrl" :alt="'user_post_' + this.post.id" class="rounded-circle" width="80" v-if="this.user.imageUrl !== null">
            <img src="/img/icon-left-font-monochrome-white.4891a9da.svg" :alt="'user_post_' + this.post.id" class="rounded-circle" width="80" v-else>
          </div>
          <div class="ml-2">
            <div class="font-weight-bold m-0 text-white">{{ this.user.pseudo }}</div>
            <p class="card-text justify-content-center">
              <small class="text-white"> {{ this.date }} à {{ this.time }} </small>
            </p>
          </div>
          <div class="m-auto">
            <BIconTrashFill @click="deletePost(this.post.id)" class="text-white" v-if="this.dataPost.canDelete === true"/>
            <BIconTrashFill @click="deletePost(this.post.id)" class="text-white" v-if="this.dataPost.canDelete === 'all'"/> 
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

    <!-- Opinions -->
    <h2 class="text-success">Commentaires: </h2>

    <!--- Add Opinion -->

    <!-- Previous opinions -->
    <div v-for="opinion in opinions" :key="opinion">
      <div class="card border-success my-2">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-row align-items-center">
              <div class="mr-2">
                <img :src="opinion.User.imageUrl" :alt="'user_opinion_' + opinion.id" class="rounded-circle" width="80" v-if="opinion.User.imageUrl !== null">
                <img src="/img/icon-left-font-monochrome-white.4891a9da.svg" :alt="'user_opinion_' + opinion.id" class="rounded-circle bg-dark" width="80" v-else>
              </div>
              <div class="mx-2">
                <div class="font-weight-bold m-0 text-dark">{{ opinion.User.pseudo }}</div>
                <p class="card-text"><small class="text-dark">19 juin 2021 à 14h06</small></p>
              </div>
            </div>
            <div class="mx-2">
              <BIconTrashFill  @click="deleteOpinion(this.post.id, opinion.id)" class="text-success" v-if="opinion.canDelete === true"/>
            </div>
          </div>
        </div>
        <div class="card-body">
          <p class="blockquote my-0">{{ opinion.content }}</p>
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
      time: "",
      opinions: [],
    };
  },
  methods: {
    deleteOpinion(id_post, id_opinion){
      if (confirm('Souhaitez-vous effacer ce commentaire?')) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.delete(
          'http://localhost:3000/api/posts/' + id_post + '/' + id_opinion, 
          { headers }
        )
          .then(res => {
            console.log(res);
            this.$router.go(this.$router.currentRoute);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    deletePost(id_post) {
      if (confirm('Confirmer la suppression de cette publication')) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.delete(
          'http://localhost:3000/api/posts/' + id_post, 
          { headers }
        )
          .then(res => {
            console.log(res);
            this.$router.push({ name: 'Index'});
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
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
        this.opinions = this.dataPost.opinions;
        this.date = this.post.createdAt.split('T')[0];
        this.time = this.post.createdAt.split('T')[1].split('.')[0];
        return console.log(res);
      })
      .catch(error => {
        return console.log(error);
      });
  }
}
</script>