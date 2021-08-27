<template>
  <div>
    {{ post }} 
    {{ user }} 
    {{ opinions }} 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostContent',
  data() {
    return {
      post: "",
      user: "",
      opinions: [],
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
        this.post = res.data.post;
        this.user = res.data.post.User;
        this.opinions = res.data.post.opinions;
        console.log(res);
      })
      .catch(error => {
        console.log(error)
      });
  }
}
</script>