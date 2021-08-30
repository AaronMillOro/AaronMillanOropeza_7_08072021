<template>
  <div class="card border-danger">
    <div class="card-header bg-danger text-white">Nouvelle annonce</div>
    <form @submit="newPost" enctype="multipart/form-data">
      <div class="card-body">
        <div class="input-group pb-2">
          <div class="input-group-prepend">
            <span class="input-group-text">Ajouter un message</span>
          </div>
          <textarea type="text" v-model='text' class="form-control" id="text" aria-label="Nouveau commentaire"></textarea>
        </div>
        <div class="input-group">
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="image/*" id="image" ref="image" v-on:change="handleFileUpload()">
            <label class="custom-file-label" for="image" v-if="image === ''">Image <small class="text-white bg-secondary px-1">*facultative</small></label>
            <label class="custom-file-label text-danger" for="image" v-else :key="image">{{ image.name }} </label>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-outline-dark">Partager</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddPost',
  data: function(){
    return {
      text: this.text,
      image: '',
    }
  },
  methods: {

    handleFileUpload() {
      this.image =  this.$refs.image.files[0];
    },

    newPost(e) {
      e.preventDefault();
      let self = this;
      if(!this.text){
        alert('Au moin un message de texte est nécessaire');
        return;
      }
      let formData = new FormData();
      formData.append('text', this.text);
      if (this.image !== '') {
        formData.append('image', this.image);
      } 
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      };
      axios.post('http://localhost:3000/api/posts', formData, { headers })
        .then(res => {
          console.log(res);
          self.$router.go(this.$router.currentRoute)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
}
</script>