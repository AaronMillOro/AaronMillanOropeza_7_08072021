<template>
  <div class="container pb-5">
    <div class="col-md-auto card">  
      <form @submit="changeImage">
        <div class="input-group py-2">
          <div class="custom-file">
            <input type="file" class="custom-file-input"  accept="image/*" id="image" ref="image" v-on:change="handleFileUpload()">
            <label class="custom-file-label" for="image" v-if="image === ''">Image du profil</label>
            <label class="custom-file-label text-danger" for="image" v-else :key="image">{{ image.name }} </label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12">
            <button type="submit" class="btn btn-outline-info btn-lg btn-block">Mettre à jour</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImageForm',
  data: function(){
    return {
      image: '',
    }
  },
  methods: {

    handleFileUpload() {
      this.image =  this.$refs.image.files[0];
    },

    changeImage(e) {
      e.preventDefault();
      if(!this.image){
        alert('Ajoutez votre image SVP!');
        return;
      }
      let formData = new FormData();
      formData.append('image', this.image);
      const headers = {
        'Content-Type': 'multipart/form',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      };
      axios.put(
        'http://localhost:3000/api/auth/account/'+ this.$route.params.id + '/avatar/', 
        formData, 
        { headers }
      )
        .then(res => {
          console.log(res);
          const userId = parseInt(this.$route.params.id);
          this.$router.push({ name: 'Profile', params: { id: userId } });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>