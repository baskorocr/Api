<template>
  <div id="login">
    <h1>Login</h1>
    <div class="form-inputs">
      <label for="email">email</label>
      <input
        type="text"
        id="email"
        name="email"
        v-model="input.email"
        placeholder="Email address"
      />
    </div>
    <div class="form-inputs">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="input.password"
        placeholder="Password"
      />
    </div>
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(
          "http://127.0.0.1:8000/api/login",
          {},
          {
            params: {
              email: this.input.email,
              password: this.input.password,
            },
          }
        )
        .then((response) => {
          if (response["status"] == 200) {
            localStorage.setItem("token", response["data"]["token"]);
            setTimeout(() => {
              this.$router.push({ name: "dashboard", path: "/dashboard" });
            }, 800);
          }
        });
    },
  },
};
</script>

<style>
#login .form-inputs {
  padding-bottom: 10px;
}
#login .form-inputs label {
  padding-right: 10px;
}
</style>
