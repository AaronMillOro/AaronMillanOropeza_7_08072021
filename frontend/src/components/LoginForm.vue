<template>
  <form @submit="postData">

    <ul v-if="errors && errors.length">
      <li v-for="error in errors" :key="error" class='text-danger'>
        {{ error }}
      </li>
    </ul>

    <div class="form-group row p-3">
      <input type="text" class="form-control col-sm-5" id="email" v-model="email" placeholder="Utilisateur" aria-label="Utilisateur" aria-describedby="email">
      <span class="input-group-text col-sm-7">@groupomania.com</span>
    </div>

    <div class="form-group row">
      <label for="password" class="col-sm-4 col-form-label">Mot de passe</label>
      <div class="col-sm-8">
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Mot secret">
      </div>
    </div>

    <div class="form-group row">
      <div class="col-sm-12">
        <button type="submit" :class=classButton>{{ text }}</button>
      </div>
    </div>
  </form>
</template>>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  props: {
    color: String, 
    text: String,
  },
  computed: {
    classButton: function() {
      return 'btn btn-outline-' + this.color + ' btn-lg btn-block';
    }
  },
  data: function(){
    return {
      email: this.email,
      password: this.password,
      errors: []
    }
  },
  methods: {
    postData(e) {
      // self outside axios instance for correct redirection
      let self = this;
      e.preventDefault();
      if(!this.email){
        alert("Nom d\'utilisateur obligatoire!");
        return;
      }
      if(!this.password){
        alert("Le mot de passe est nécessaire!");
        return;
      }
      const User = {
        email: this.email + '@groupomania.com',
        password: this.password
      };
      const headers = {
        'Content-type': 'application/json',
      };
      axios.post('http://localhost:3000/api/auth/login', User, { headers })
        .then(res => {
          const userId = res.data.userId;
          const token = res.data.token;
          localStorage.setItem('userId', userId);
          localStorage.setItem('token', token);
          axios.defaults.headers.Authorization = "Bearer " + localStorage.getItem('token');
          self.$router.push({ name: 'Index'});
        })
        .catch(error => {
          let msg = error.response.data.error;
          this.errors.push(msg);
        });
    }
  }
}
</script>