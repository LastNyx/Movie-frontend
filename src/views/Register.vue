<template>
  <div class="container">
    <div class="alert alert-danger" role="alert" v-if="error !== null">
            {{ error }}
        </div>
    <form class="RegisterForm fade-in">
      <div class="align-left arrow">
        <router-link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000" class="bi bi-house" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
          </svg>
        </router-link>
      </div>
      <h2 class="align-center">Register</h2>
      <div class="form-row m-2">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="text" type="text" class="form-control" 
            v-model="username" required 
            autofocus>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control"
              v-model="password"
              required>
        </div>
      </div>

      <div class="form-group align-center">
        <button type="submit" class="btn btn-primary" @click="handleSubmit">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      if (this.password.length > 0) {
        await this.axios.get('/sanctum/csrf-cookie')
        .then(async response => {
          await this.axios.post('/api/register', {
            name: this.username,
            password: this.password
          })
          .then(response => {
            if (response.data.success) {
              this.$router.push('login')
            } else {
              this.error = 'This UserName Has been Taken'
            }
          })
          .catch(function (error) {
            console.error(error);
          });
        })
      }
    }
  },
  mounted(){
    if (this.loggedIn) {
      this.$router.push('/')
    }
  },
  computed:{
    loggedIn(){
      return this.$store.state.loggedIn
    },
  }
}
</script>

<style>
.RegisterForm{
    margin: 20vh auto 0;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.80);
    width: 50%;
    padding: 0 0 38px;
    border-radius: 4px;
    position: relative;
}
</style>