<template>
  <div class="row pt-3 fade-in">
    <h3 class="text-white">{{status}}</h3>
    <div class="film-view row">
      <template v-for="film in films" :key="film.id">
        <div class="col-12 col-sm-3 col-md-3 p-1" v-if="film.favorite !== 0">
          <FilmList
            :film="film.films"
            :status="status"
            v-on:reloadlist="reloadList()"
          />
        </div>
      </template>
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