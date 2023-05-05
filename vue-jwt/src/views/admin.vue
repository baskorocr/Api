<template>
  <div class="about">
    <h1>you admin</h1>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  name: "admin",
  mounted() {
    console.log("admin");
  },
};
</script>
