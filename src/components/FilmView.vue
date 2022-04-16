<template>
  <div class="row pt-3 fade-in">
    <h3 class="text-white">{{status}}</h3>
    <div class="film-view row">
      <div class="col-12 col-sm-3 col-md-3 p-1"
        v-for="film in films" :key="film.id"
      >
      <FilmList
        :film="film"
        :status="status"
        v-on:reloadlist="reloadList()"
      />
      </div>
    </div>
  </div>
</template>

<script>
import FilmList from "./FilmList.vue";

export default {
  props:['films','status'],
  components: { FilmList },
  methods: {
    reloadList(){
      this.$emit('reloadlist')
    }
  }
}

</script>

<style>

</style>