<template>
  <div class="container">
    <div class="alert alert-danger" role="alert" v-if="error !== null">
      <ul class="m-0">
        <li>{{error.status_id[0]}}</li>
      </ul>
    </div>
    <form class="film-form card bg-custom" v-on:submit.prevent>
      <div class="row m-2">
        <div class="col-6">
          <h3 v-if="isCreate" class="align-center fade-in">Create New Movie</h3>
          <h3 v-else-if="isEdit" class="align-center fade-in">Edit Movie</h3> 
        </div>
        <div class="col-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000" class="bi bi-x-lg float-end pointer" viewBox="0 0 16 16" @click="handleCloseForm">
            <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
            <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
          </svg>
        </div>
      </div>
      
      <div class="row m-2">
        <div class="col-5 mb-1">
          <input id="text" type="text" class="form-control" 
            v-model="films.title" required 
            autofocus
            placeholder="Title">
        </div>

        <div class="col-5 mb-1">
            <input id="text" type="text" class="form-control"
              v-model="films.thumbnail"
              required
              placeholder="Thumbnail">
        </div>

        <div class="col-2 align-center">
          <button v-if="isCreate" type="submit" class="btn btn-primary" @click="handleCreate">
            Create
          </button>
          <button v-else-if="isEdit" type="submit" class="btn btn-primary" @click="handleEdit">
            Update
          </button>
        </div>

       
      </div>
      <div class="row m-2">
          <div class="col-10">
            <select v-model="films.status_id" class="form-select" aria-label="Default select example">
              <option value="" disabled selected hidden>Select Movie Status...</option>
              <option v-for="status in statuses" :key="status.id" :value="status.id">{{status.name}}</option>
            </select>
          </div>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      films:{
        title:"",
        thumbnail:"",
        status_id: "",
      },
      error: null,
    }
  },
  methods:{
    async handleCreate(){
      if(this.films.title == "" || this.films.thumbnail == ""){
        return;
      }
  
      await this.axios.post('/api/films',{
        films: this.films
      },{headers: { "Authorization": "Bearer " + this.token,}})
      .then(response=>{
        if(response.status == 201){
          this.title="";
          this.thumbnail="";
          this.$emit('reloadlist');
          this.handleIsCreate()
        }
      })
      .catch(error => {
        this.error = error.response.data
      })
    },
    async handleEdit(){
      if(this.films.title == "" || this.films.thumbnail == ""){
        return;
      }
  
      await this.axios.put('/api/films/'+this.filmDetail.id,{
        films: this.films
      },{headers: { "Authorization": "Bearer " + this.token,}})
      .then(response=>{
        console.log(response.data)
        if(response.status == 200){
          this.title="";
          this.thumbnail="";
          this.$emit('reloadlist');
          this.handleIsEdit()
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    handleCloseForm(){
      if(this.isCreate){
        this.handleIsCreate()
      }else{
        this.handleIsEdit()
      }
    },
    handleIsCreate(){
      this.$store.dispatch('handleIsCreate')
      this.$store.dispatch('handleFilmForm')
    },
    handleIsEdit(){
      this.$store.dispatch('handleIsEdit')
      this.$store.dispatch('handleFilmForm')
    },
    handleEmptyForm(){
      this.films.title = ''
      this.films.thumbnail = ''
    },
    handleEditForm(){
      this.films.title = this.filmDetail.title
      this.films.thumbnail = this.filmDetail.thumbnail
      this.films.status_id = this.filmDetail.status_id
    } 
  },
  mounted(){
    if(this.isEdit){
      this.handleEditForm()
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    },
    isCreate() {
      return this.$store.state.isCreate
    },
    isEdit() {
      return this.$store.state.isEdit
    },
    filmDetail() {
      return this.$store.state.filmDetail
    },
    statuses() {
      return this.$store.state.statuses
    },
  },
  watch:{
    isCreate(){
      if(this.isCreate){
        this.handleEmptyForm()
      }
    },
    isEdit(){
      if(this.isEdit){
        this.handleEditForm()
      }
    },
    filmDetail(){
      if(this.isEdit){
        this.handleEditForm()
      }
    }
  }
}
</script>

<style>

</style>