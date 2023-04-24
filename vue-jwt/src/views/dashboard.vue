<template>
  <div class="about">
    <h1>you user</h1>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  name: "dashboard",
  mounted() {
    let token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push({ name: "login", path: "/login" });
    } else {
      axios.defaults.headers.common["Authorization"] = "Bearer" + token;
      var decoded = jwt_decode(token);
      let user = decoded["sub"];
      console.log(decoded);
      const t = axios.get("http://localhost:8000/api/v1/users/" + user);
      console.log(t);
    }
  },
};
</script>
