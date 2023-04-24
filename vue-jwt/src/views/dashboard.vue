<template>
  <div class="about">
    <h1>you user</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dashboard",
  mounted() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer" + token;
    const d = jwt.verify("token", token);
    console.log(d);
    const t = axios.get("http://localhost:8000/api/v1/users/" + { $id });
  },
};
</script>
