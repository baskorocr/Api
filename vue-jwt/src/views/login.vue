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
    login() {
      var app = this;
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
          if (response["status"] === 200) {
            const status = response["data"]["user"]["status"];
            const token = response["data"]["token"];
            console.log(token);
            const data = { status: status, token: token };
            app.$store.state.isLoggedIn = true;
            window.localStorage.setItem("user", JSON.stringify(data));
            console.log(status);
            if (status === 1) {
              app.$router.push("/admin");
            } else if (status === 2) {
              app.$router.push("/dashboard");
            }
          } else {
            app.$store.state.isLoggedIn = false;
          }
        });
    },
    loginAuth: function () {
      var app = this;
      const status = JSON.parse(window.localStorage.getItem("user"));
      if (status === null || status === undefined) {
        app.$router.push("/login");
      } else if (status.status === "1") {
        app.$router.push("/admin");
      } else {
        app.$router.push("/dashboard");
      }
    },
    created: function () {
      this.loginAuth();
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
