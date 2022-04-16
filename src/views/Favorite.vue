<template>
  <transition>
    <div v-if="filmForm" class="container">
      <div class="card bg-custom justify-content-center align-items-center">
        <h2 class="m-3">Please Go Back to Main Page Before Create a new Movie</h2>
        <router-link class="btn btn-outline-primary m-2" to="/">Home</router-link>
      </div>
    </div>
  </transition>
  
  <div class="main container-fluid">
    <FavFilmView 
      :films="favList"
      v-on:reloadlist="getFavList()"
      status="Favorite List"
    />
  </div>
</template>

<script>
import FavFilmView from "../components/FavFilmView.vue"

export default {
  components: { FavFilmView },
  data(){
    return {
      
    }
  },
  methods: {
    getFavList(){
      this.$store.dispatch('getFavList')
    }
  },
  created(){
    this.getFavList()
  },
  mounted(){
    
    if (!this.loggedIn) {
      this.$router.push('/')
    }
  },
  computed:{
    uid(){
      return this.$store.state.uid
    },
    filmForm(){
      return this.$store.state.filmForm
    },
    loggedIn() {
      return this.$store.state.loggedIn
    },
    token() {
      return this.$store.state.token
    },
    favList(){
      return this.$store.state.favList
    }
  }

}
</script>

<style>

</style>