<template>
<div>
  <div class="container pb-5">
    <div class="row justify-content-md-center">
      <div class="col col-md-3 card bg-dark"> 
        <img src="/img/icon-left-font-monochrome-white.4891a9da.svg" width="200" height="200" class="d-inline-block align-top img-responsive" alt="user image" v-if="this.user.imageUrl === null"/>
        <img :src="this.user.imageUrl" width="200" height="200" class="d-inline-block align-top img-responsive" alt="user image" v-else/>
      </div>
      <div class="col-md-auto card">  
        <p class="pt-3"><b>Nom à afficher:</b> {{ this.user.pseudo }} </p>
        <p><b>Poste:</b> {{ this.user.job }}</p>
        <p><b>Email:</b> {{ this.user.email }}</p>
        <p><b>Compte crée le:</b> {{ this.date }}</p>

        <!-- Option available for admin -->
        <div class="col-sm-12" v-if="this.canDelete === 'all'">
          <button @click="deleteAccount(this.user.id)" type="button" class="btn btn-outline-danger btn-lg btn-block">Effacer compte <BIconTrashFill class="text-danger"/> </button>
        </div>

      </div>
      <div class="col col-md-1"> </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileCard',
  data() {
    return {
      user: {},
      canDelete: '',
      date: '',
    }
  },
  methods: {

    deleteAccount(id) {
      if (confirm('Êtes-vous sur de vouloir effacer ce compte?')) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        axios.delete('http://localhost:3000/api/account/' + id, { headers })
          .then(res => {
            console.log(res);
            this.$router.push({ name: 'Index' });
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
    axios.get('http://localhost:3000/api/account/' + this.$route.params.id,
      { headers }
    )
      .then(res => {
        this.user = res.data.user;
        this.canDelete = res.data.canDelete;
        this.date = this.user.createdAt.split('T')[0];
        return console.log(res);
      })
      .catch(error => {
        console.log(error);
        this.$router.push({ name: 'Index' });
      });
  }
}
</script>