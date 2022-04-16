<template>
  <div id="nav" class="fade-in">
    <router-link to="/">Home</router-link> |
    <template v-if="!loggedIn">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
    </template>
    <template v-else>
      <a class="nav-a" @click="logout">Logout</a> |
      <p class="nav-p">Hello, {{name}}</p> |
      <template v-if="role=='admin'">
        <a class="nav-a" @click="handleIsCreate">Create</a> |
      </template>
      <router-link to="/favorite">Favorite List</router-link> |
    </template>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>

export default {
  methods: {
    async logout() {
      await this.axios.get("/sanctum/csrf-cookie")
        .then(async (response) => {
          await this.axios.get("/api/logout", { headers: { "Authorization": "Bearer " + this.token }})
            .then(response => {
              if (response.data.success) {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("token");
                localStorage.removeItem("uid");
                window.location.href = "/";
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        });
    },
    async userInfo(){
      await this.$store.dispatch('getUser')
    },
    handleIsCreate(){
      if(this.filmForm){
        if(this.isEdit){
          this.$store.dispatch('handleFilmForm')
          this.$store.dispatch('handleIsEdit')
          this.$store.dispatch('handleIsCreate')
          this.$store.dispatch('handleFilmForm')
        }else{
          this.$store.dispatch('handleIsCreate')
          this.$store.dispatch('handleFilmForm')
        }
      }else{
        this.$store.dispatch('handleIsCreate')
        this.$store.dispatch('handleFilmForm')
      }
    }
  },
  created(){
    if(this.loggedIn){
      this.userInfo()
    }
  },
  watch:{
    loggedIn(){
      if(this.loggedIn=='true'){
        this.userInfo()
      }
    }
  },
  computed: {
    name() {
      return this.$store.state.name
    },
    role() {
      return this.$store.state.role
    },
    token() {
      return this.$store.state.token
    },
    loggedIn(){
      return this.$store.state.loggedIn
    },
    isEdit(){
      return this.$store.state.isEdit;
    },
    filmForm(){
      return this.$store.state.filmForm;
    }
  }
}
</script>

<style>

</style>