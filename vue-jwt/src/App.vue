<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <a
      href=""
      v-if="this.$store.state.isLoggedIn === true"
      v-on:click="logout()"
      >Logout
    </a>

    <router-link v-if="this.$store.state.isLoggedIn === false" to="/login"
      >Login</router-link
    >
    |
    <router-link to="/register">Regist</router-link>
  </nav>
  <router-view />
</template>

<script>
import axios from "axios";
export default {
  name: "nav",
  methods: {
    logout() {
      let token = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers.common["Authorization"] =
        "Bearer" + token["token"];
      axios
        .get("http://127.0.0.1:8000/api/logout")
        .then(localStorage.removeItem("user"), this.$router.push("/login"))
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
