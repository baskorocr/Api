<template>
  <div v-if="stat.email != null">Email Sudah digunakan</div>
  <div v-if="stat.password != null">Cek Password anda</div>
  <div v-if="stat.resp == true">anda telah terdaftar</div>
  <div id="login">
    <h1>Login</h1>
    <div class="form-inputs">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        v-model="input.username"
        placeholder="Username"
      />
    </div>
    <div class="form-inputs">
      <label for="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        v-model="input.email"
        placeholder="email"
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
    <div class="form-inputs">
      <label for="passwordConfirmation">Password-confirmation</label>
      <input
        type="password"
        id="passwordConfirmation"
        name="passwordConfirmation"
        v-model="input.passwordConfirmation"
        placeholder="Password-confirmation"
      />
    </div>
    <button type="button" v-on:click="regist()">Login</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        email: "",
        password: "",
        PasswordConfirmation: "",
        status: "2",
      },
      stat: {},
    };
  },
  mounted() {
    if (this.$store.state.isLoggedIn) {
      const authUser = JSON.parse(window.localStorage.getItem("user"));
      if (authUser.status === 2) {
        this.$router.push("/dashboard");
      } else if (authUser.status === 1) {
        this.$router.push("/admin");
      }
    }
  },
  methods: {
    regist() {
      axios
        .post(
          "http://127.0.0.1:8000/api/register",
          {},
          {
            params: {
              name: this.input.username,
              email: this.input.email,
              password: this.input.password,
              password_confirmation: this.input.passwordConfirmation,
              status: this.input.status,
            },
          }
        )
        .then(() => this.$router.push({ name: "login", path: "/login" }))
        .catch(
          (err) =>
            (this.stat = {
              email: err["response"]["data"]["email"],
              password: err["response"]["data"]["password"],
            })
        );
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
