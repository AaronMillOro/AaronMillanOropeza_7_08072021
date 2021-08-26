<template>
  <div>
    
    {{ Posts }}
    
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