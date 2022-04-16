<template>
  
  <transition>
    <FilmForm 
      v-if="filmForm"
      v-on:reloadlist="getFilmList()"
    />
  </transition>
  
  <div class="main container-fluid">
    <FilmView 
      v-for="status in statuses" :key="status.id"
      :films="status.films"
      :status="status.name"
      v-on:reloadlist="getFilmList()"
    />
  </div>
</template>

<script>
import FilmView from "../components/FilmView.vue"
import FilmForm from "../components/FilmForm.vue"

export default {
  components: { FilmView, FilmForm },
  data() {
    return {
      statuses: [],
      loggedIn: null,
      token: localStorage.getItem('token'),
      uid: localStorage.getItem('uid'),
      error: null
    };
  },
  methods: {
    async getFilmList() {
      await this.axios.get("/api/statuses",{headers: {'Authorization': 'Bearer '+this.token}})
        .then(response => {
          this.statuses = response.data.data;
          this.$store.dispatch('handleStatuses',response.data.data)
        })
        .catch(error => {
          console.log(error);
        });
      },
    getLoggedIn() {
      this.loggedIn = localStorage.getItem("loggedIn")
    }

  },
  created() {
    if(this.loggedIn){
      this.$store.dispatch('getFavList')
      this.$store.dispatch('getUser')
    }
    this.getFilmList();
  },
  watch: {
    $route: {
      immediate: true,
        handler() {
        this.getLoggedIn()
      }
    },
  },
  computed: {
    filmForm() {
      return this.$store.state.filmForm
    },
  }
    
}
</script>

<style>

</style>