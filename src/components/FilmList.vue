<template>
  <div class="card mb-3 h-100 bg-custom" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="film.thumbnail" class="img-fluid rounded-start" alt="thumbnail">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{film.title}}</h5>
        <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        <p class="card-text"><small class="text-muted">Your Rating : {{rating}}</small></p>

        <div v-if="loggedIn" class="fav">
          <div class="dropup">
            <div class="dropdown-menu w-100 mb-3" :class="dropDownShow ? 'show' : ''">
              <form class="p-2">
                <div class="input-group">
                  <input id="number" type="number" class="form-control" 
                    v-model="favrating.rating" required 
                    autofocus
                    placeholder="Rating"
                    min="1"
                    max="5">
                  <div class="input-group-append">
                    <button class="btn btn-outline-success" type="button" @click="handleClickFavRating('rating');handleDropDownShow();">Submit</button>
                  </div>
                </div>
              </form>
              <div class="d-flex justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000" class="bi bi-x-lg pointer" viewBox="0 0 16 16" @click="handleDropDownShow()">
                  <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                  <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                </svg>
              </div>
            </div>
          </div>

          <button v-if="favorite == 0" class="btn btn-outline-primary w-100 mb-1" @click="handleClickFavRating('fav')">Favorite</button>
          <button v-else-if="favorite == 1" class="btn btn-outline-primary w-100 mb-1" @click="handleClickFavRating('fav')">Favorited 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg rotate-scale-up" viewBox="0 0 16 16">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
            </svg>
          </button>

          <button v-if="rating !== 'none'" class="btn btn-outline-success w-100 mb-1 dropdown-toggle" @click="handleDropDownShow">Rating</button>
        </div>

        <template v-if="status != 'Favorite List'">
          <div v-if="role=='admin'" class="edit">
            <button class="btn btn-outline-secondary w-100 mb-1" @click="handleIsEdit">Edit</button>
            <button class="btn btn-outline-danger w-100 mb-1" @click="handleDelete">Delete</button>
          </div>
        </template>
        
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:['film','status'],
  data(){
    return{
      favorite: 0,
      rating: "None",
      favrating_id: "",
      dropDownShow: false,
      favrating:{
        film_id: this.film.id,
        user_id: localStorage.getItem('uid'),
        favorite: 0,
        rating: 0,
      }
    }
  },
  methods:{
    handleDropDownShow(){
      this.dropDownShow = !this.dropDownShow
    },
    async handleIsEdit(){
      if(this.filmForm){
        if(this.isCreate){
          await this.getFilmDetail()
          this.$store.dispatch('handleFilmForm')
          this.$store.dispatch('handleIsCreate')
          this.$store.dispatch('handleIsEdit')
          this.$store.dispatch('handleFilmForm')
        }else if(this.film.id != this.filmDetail.id){
          await this.getFilmDetail()
        }else{
          this.$store.dispatch('handleIsEdit')
          this.$store.dispatch('handleFilmForm')
        }
      }else{
        await this.getFilmDetail()
        this.$store.dispatch('handleIsEdit')
        this.$store.dispatch('handleFilmForm')
      }
    },
    async handleDelete(){
      await this.axios.delete('/api/films/'+this.film.id,{headers: { "Authorization": "Bearer " + this.token,}})
      .then(response=>{
        if(response.status == 200){
          this.$emit('reloadlist');
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    async getFilmDetail(){
      await this.axios.get('/api/films/'+this.film.id)
      .then(response => {
        if (response.status == 200){
          this.$store.dispatch('handleFilmDetail',response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    async handleFavorite(){
      await this.$store.dispatch('getFavList')
      for (var key in this.favList) {
        if (this.favList[key].film_id == this.film.id) {
          this.favorite = this.favList[key].favorite;
          this.rating = this.favList[key].rating;
          this.favrating.rating = this.favList[key].rating;
          this.favrating_id = this.favList[key].id;
        }
      }
    },
    async handleClickFavRating(value){
      this.favrating.favorite = 1
      await this.axios.post('/api/favorites',{
        favrating: this.favrating,
      },{headers: { "Authorization": "Bearer " + this.token,}})
      .then(response => {
        if(response.status == 201){
          this.handleFavorite();
        }else if(response.status == 200){
          this.handleClickFavRatingEdit(value)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    async handleClickFavRatingEdit(value){
      if(value == 'fav'){
        if(this.favorite == 0){
        this.favrating.favorite = 1
        }else{
          this.favrating.favorite = 0
        }
      }
      
      await this.axios.put('/api/favorites/'+this.favrating_id,{
        favrating: this.favrating  
      },{headers: { "Authorization": "Bearer " + this.token,}})
      .then(response => {
        if(response.status == 201){
          this.handleFavorite();
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted(){
    if(this.loggedIn){
      this.handleFavorite();
    }
  },
  computed: {
    isCreate() {
      return this.$store.state.isCreate
    },
    isEdit() {
      return this.$store.state.isEdit
    },
    filmForm() {
      return this.$store.state.filmForm
    },
    filmDetail() {
      return this.$store.state.filmDetail
    },
    favList() {
      return this.$store.state.favList
    },
    role() {
      return this.$store.state.role
    },
    loggedIn() {
      return this.$store.state.loggedIn
    },
    token() {
      return this.$store.state.token
    },
  }
}
</script>

<style>
.svg{
  display:flex;
  justify-content: center;
  float:right;
  width:30%;
}
.title{
  display:flex;
  justify-content: center;
  float:left;
  width:70%;
  font-weight: 600;
}

.thumbnail{
  margin-bottom:1rem;
  max-height: 268px;
}

.thumbnail-img{
  width:100%; 
  height:15rem; 
  object-fit: cover;
}
</style>