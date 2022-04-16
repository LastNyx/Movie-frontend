<template>
  <Navbar/>
  <router-view/>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  data() {
      return {
          loggedIn: localStorage.getItem("loggedIn"),
          token: localStorage.getItem("token"),
      };
  },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 1.5rem;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #d01b59;
}
</style>
