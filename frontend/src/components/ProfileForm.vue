<template>
  <div class="container pb-5">
    <div class="row justify-content-md-center">
      <div class="col col-md-3 card"> 
        <img class="card-img-top" :src="this.user.imageUrl" alt="profile image" v-if="this.user.imageUrl !== null">
        <div class="card-body"> 
          <button @click="goToImage" class="btn btn-info">Modifier image</button> 
        </div>
      </div>

      <div class="col-md-auto card">  
        <form @submit="updateInfo">
          <div class="form-group row py-2">
            <label for="pseudo" class="col-sm-4 col-form-label"><b>Nom à aficher</b></label>
            <div class="col-md-8"> <input type="text" class="form-control" id="pseudo" v-model="name"></div>
          </div>
          <div class="form-group row py-2">
            <label for="job" class="col-sm-4 col-form-label"><b>Poste</b></label>
            <div class="col-sm-8"> <input type="text" class="form-control" id="job" v-model="job"></div>
          </div>
          <p class="py-2 text-center">Dernière actualisation le <br><b>{{ this.date }}</b></p>
          <p class="py-2 text-center">Membre depuis le <br><b>{{ this.dateInscription }}</b></p>
          <div class="form-group row">
            <div class="col-md-12">
              <button type="submit" class="btn btn-outline-info btn-lg btn-block">Mettre à jour</button>
            </div>
          </div>
        </form>
      </div>

      <div class="col col-md-1"> </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileForm',
  data() {
    return {
      user: '',
      date: '',
      dateInscription: '',
      name: '',
      job: '',
    }
  },
  methods: {

    updateInfo(e) {
      e.preventDefault();
      if(!this.name){
        alert("Nom à afficher obligatoire!");
        return;
      }
      if(!this.job){
        alert("Ajoutez votre poste!");
        return;
      }
      const userInfo = {
        pseudo: this.name,
        job: this.job
      };
      const headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      };
      axios.put('http://localhost:3000/api/auth/account/' + this.user.id + '/', userInfo, { headers })
        .then(res => {
          this.$router.go(this.$router.currentRoute);
        })
        .catch(error => {
          console.log(error);
        });
    },

    goToImage(){
      const urlInfo = '/auth/account/' + this.user.id + '/avatar/';
      return this.$router.push({ name: 'ProfileImage', params: {id: this.user.id} });
    }

  },

  created() {
    const headers = { 
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
    axios.get('http://localhost:3000/api/auth/account/' + this.$route.params.id, { headers })
      .then(res => {
        this.user = res.data.user;
        this.name = res.data.user.pseudo;
        this.job = res.data.user.job;
        this.date = this.user.updatedAt.split('T')[0];
        this.dateInscription = this.user.createdAt.split('T')[0];
        return console.log(res);
      })
      .catch(error => {
        console.log(error);
        this.$router.push({ name: 'Index' });
      });
  }
}
</script>